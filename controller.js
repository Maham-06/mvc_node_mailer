const model = require('./model');
const view = require('./view');

exports.sendSimpleEmail = async (to, subject, message) => {
  return await model.sendEmail(to, subject, view.templates.simple(message));
};

exports.sendWelcomeEmail = async (to, name) => {
  return await model.sendEmail(to, 'Welcome to Our Platform', view.templates.welcome(name));
};

exports.getEmailForm = () => {
  return view.htmlPages.emailForm();
};