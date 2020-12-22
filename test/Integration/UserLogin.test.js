const chai = require("chai");
const expect=require("chai").expect;
chai.use(require("chai-as-promised"));
var faker = require('faker');

const usrRepo =require('../../repository/User-repository');


const dummyUser = {
    firstName :faker.name.firstName() ,
    lastName: faker.name.lastName(),
    email:faker.internet.email(),
    password:faker.internet.password()
}    

describe("UserRepository functions",()=>{

    before(()=>{
                 
    });


    it('Insert Dummy User to database',async function(){
        const user = await usrRepo.createtUser(dummyUser);
        console.log(user)
        expect(user.email).to.equal(dummyUser.email);       
        expect(user.dataValues).to.have.any.keys("id", "firstName","lastName", "email", "password");
        
    });

    it('Existing email re insertion Should Throw Unique Key Error',async function(){
        await expect(usrRepo.createtUser(dummyUser)).to.be.rejected
                .then(function(error) {
                    expect(error).to.have.property('name', 'SequelizeUniqueConstraintError');        
                });
            
    });
    
    it('Finally Delete dummy User from database',async function(){
           await usrRepo.deleteUserByEmail(dummyUser.email);
    })
});