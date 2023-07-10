exports.getAllInvoices = async (req, res) => {
  return res.status(200).send(`December: ${JSON.stringify(req.user)}`);
};
