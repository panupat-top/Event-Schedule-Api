const firebase = require('./../db/firebase-firestore');
const firestore = firebase.firestore();

const addController = async (req, res) => {
  try {
    const { name, date, time } = req.body;

    if (!name || !date || !time) {
      throw { status: 400, message: 'parameter not found!' };
    }

    const docRef = await firestore.collection('events').add({ name, date, time });
    const { id } = docRef;

    await firestore.collection('events').doc(id).update({ id: id });

    res.status(200).json({ message: 'insert event success' });
  } catch (error) {
    res.status(error.status || 500).json({ error_message: error.message || 'Server Error!' });
  }
};

const listsController = async (req, res) => {
  try {
    const snapshot = await firestore.collection('events').get();
    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const response = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      response.push(data);
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error_message: error.message || 'Server Error!' });
  }
};

const removeController = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw { status: 400, message: 'parameter not found!' };
    }

    await firestore.collection('events').doc(id).delete();
    
    res.status(200).json({ message: 'remove event success' });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error_message: error.message || 'Server Error!' });
  }
};

module.exports = {
  addController,
  listsController,
  removeController
};
