var User = require('../models').User;
const bcrypt = require('bcrypt');



var UsersRepository = {	
	
	findOneByEmail:function(uEmail){
		/*this function will use to verify if user exists with email*/
		 return User.findOne({
			where:{
				email:uEmail
			}
		 });

	},

	createtUser:async function(mUser){
		const hash = bcrypt.hashSync(mUser.password, 10);		 
			return User.create({
				firstName:mUser.firstName,
				lastName: mUser.lastName,
				email: mUser.email,
				password: hash
			});
		
	},
	deleteUserByEmail: async function(mEmail){
		return User.destroy({
			where: {
				email:mEmail 
			}
		})
	},
	checkUser: async function(username, password) {
		//... fetch user from a db etc.
	 /*
		const match = await bcrypt.compare(password, user.passwordHash);
		return match;*/
	}

/*
   findAllByLecId: function(lecId){
	   return Question.findAll({		
		 attributes: ['id','title'],
		 where:{videoname:lecId},
		 include: [{
				model:QOptions,
				attributes: ['id','option_text'],			
			}],
		 order: [
            ['id', 'DESC']
            
		  ]
		})
   },
   findById: function(id){		  
       return Question.findAll({
			attributes: ['id','title'],
            where: {
                id: id				
            },
			include: [{
				model:QOptions,
				attributes: ['id','option_text'],
			}]
        })
    },
	findCorrectOptionsByQId: function(id){
		return QOptions.findAll({	
		 attributes: ['id','iscorrect'],
		 where:{
			 question_id:id,
			 iscorrect:true
		 }
		})
	},
	destroyById:function(qid){
		return Question.destroy({
			where:{id:qid},
			include: [{model:QOptions}]
		})
	}*/
}
module.exports = UsersRepository;