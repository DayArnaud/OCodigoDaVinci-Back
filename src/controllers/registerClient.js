const dbOperations = require('../utils/dbOperations');
const validEmail = require('../schemas/validEmail');
const { validateName, validateCPF, validatePhone, validatePostal, validateState } = require('../utils/validation');

const HTTP_SUCCESS = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;

async function checkEmailAvailability(req, res) {
    const { email } = req.body;
  
    try {
      await validEmail.validate(req.body);
      await dbOperations.isEmailValid(email, db, "clients");

      return res.status(HTTP_SUCCESS).json({ message: "Valid email" });
    } catch (error) {
      return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
    }
  }
  

async function regiterClient(req, res) {
    const {
        name,
        email,
        cpf, 
        phone, 
        cep, 
        address, 
        complement, 
        neighborhood, 
        city, 
        state 
    } = req.body;

    try {
        await validateName(name, 'clients');
        await validEmail.validate(req.body);
        await dbOperations.isEmailValid(email,'clients');
        await validateCPF(cpf, 'clients');
        await validatePhone(phone, 'clients');
        
        if(cep){
          await validatePostal(cep)
        }
        
        if(state){
        await validateState(state)
        }

       const client =  await dbOperations.registerNewClient(
        name,
        email,
        cpf, 
        phone,
        cep, 
        address, 
        complement, 
        neighborhood, 
        city, 
        state 
       );

    return res.status(HTTP_CREATED).json(client[0])

    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}

module.exports = {
    regiterClient,
    checkEmailAvailability
}