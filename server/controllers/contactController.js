const Contact = require("../models/Contact");

const getContacts = async (req, res) => {
    const contacts = await Contact.find({}).lean();
    if (!contacts.length) {
        return res.status(400).json({
            error: true,
            message: "There are no contacts",
            data: null
        });
    }
    res.json({
        error: false,
        message: '',
        data: contacts
    });
};

const getContact = async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findById(id).lean();
        if (!contact) {
            return res.status(400).json({ error: true, message: 'No contact found', data: null });
        }
        res.json({
            error: false,
            message: '',
            data: contact
        });
    } catch (err) {
        return res.status(500).json({ error: true, message: err.message, data: null });
    }
};

const addContact = async (req, res) => {
    const { name, email, phone } = req.body;
    //confirm data
    if (!name || (!email && !phone)) {
        return res.status(400).json({
            error: true,
            message: 'יש להזין שם ופרטי קשר (אימייל או טלפון)',
            data: null
        });
    }
    try {
        const contact = await Contact.create({ name, email, phone });
        res.status(201).json({
            error: false,
            message: 'Contact created successfully',
            data: contact
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(400).json({
            error: true,
            message: 'Error creating contact',
            data: null
        });
    }
};

const updateContact = async (req, res) => {
    const { id, name, phone, email } = req.body;
    //confirm data
    if (!id ) {
        return res.status(400).json({
            error: true,
            message:"יש להזין מס'ה id",
            data: null
        });
    }
    if(!name){
        return res.status(400).json({
            error: true,
            message: 'יש להזין שםן)',
            data: null
        });
    }
    if((!phone && !email)){
        return res.status(400).json({
            error: true,
            message: 'יש להזין פרטי קשרן)',
            data: null
        });
    }
    try {
        const contact = await Contact.findById(id).exec();
        if (!contact) {
            return res.status(400).json({
                error: true,
                message: "Contact not found",
                data: null
            });
        }
        contact.name = name;
        if (phone) contact.phone = phone;
        if (email) contact.email = email;

        const updatedContact = await contact.save();
        res.json({
            error: false,
            message: `${updatedContact.name} updated successfully`,
            data: updatedContact
        });
    } catch (err) {
        return res.status(500).json({ error: true, message: 'Error updating contact'+err, data: null });
    }
};

const deleteContact = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            error: true,
            message: "Id is required",
            data: null
        });
    }
    try {
        const contact = await Contact.findById(id).exec();
        if (!contact) {
            return res.status(400).json({
                error: true,
                message: "Contact not found",
                data: null
            });
        }
        const deletedContact = await contact.deleteOne();
        res.status(200).json({
            error: false,
            message: "Contact deleted successfully",
            data: deletedContact
        });
    } catch (err) {
        return res.status(500).json({ error: true, message: 'Error deleting contact', data: null });
    }
};

module.exports = {
    getContact,
    getContacts,
    updateContact,
    addContact,
    deleteContact
};
