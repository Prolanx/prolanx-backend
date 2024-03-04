const { Account } = require("../schema/account.schema");

const findAccountByEmail = async (email) => {
  try {
    const data = await Account.findOne({ email });
    return { data };
  } catch (error) {
    return { error };
  }
};

const findAccountById = async (id) => {
  try {
    const data = await Account.findById(id);
    return { data };
  } catch (error) {
    return { error };
  }
};

const findAccount = async (filter) => {
  try {
    const result = await Account.findOne({ ...filter }).lean();
    const data = { ...result };
    const id = data._id;
    delete data._id;
    data.id = id.toString();
    return { data };
  } catch (error) {
    return { error };
  }
};

const saveAccount = async (payload) => {
  try {
    const doc = new Account(payload);
    const result = await doc.save();
    const id = result._id;
    delete result._id;
    result.id = id;
    return { data: result };
  } catch (error) {
    return { error };
  }
};

const updateAccount = async (userId, updates) => {
  try {
    const result = await Account.findByIdAndUpdate(userId, updates, {
      new: true,
    }).lean();
    const id = result._id;
    result.id = id.toString();
    delete result._id;
    return { data: result };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  updateAccount,
  saveAccount,
  findAccountByEmail,
  findAccount,
  findAccountById,
};
