const Browser = require('zombie');

Browser.localhost('0.0.0.0', 3000);
//first attempt
describe('User visits Login page', function(){
  
   const browser = new Browser();
   before(function(done) {
      browser.visit('/login', done);
    });
  //----------------------------------------------------------------
  it('Should see welcome title', function() {
      browser.assert.text('title', 'Hello, world!');   
   });

   it('Should have 1 form,2 input fields, 1 button, 1 <a href=/register>',()=>{
      browser.assert.elements('form', 1);     
      browser.assert.elements('form input', 2);
      browser.assert.elements('form button', 1);
      browser.assert.attribute('a', 'href', '/register');
     
   });     

   it('Form should have method POST & input[name=email] & input[name=password] ',()=>{
      browser.assert.attribute('form', 'method', 'POST');
      browser.assert.element('form input[name=email]');       
      browser.assert.element('form input[name=password]');    
      
   }) ;    
   it('All form controls should have class form-control',()=>{
      browser.assert.hasClass('form input[name=email]', 'form-control');
      browser.assert.hasClass('form input[name=password]', 'form-control');
      browser.assert.hasClass('form button', 'form-control');
   });

  });