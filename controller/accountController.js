const Customer = require("../model/customerModel");

exports.updateprofile = (req, res) => {
  const id = req.params.custId;
  Customer.updateOne({ _id: id }, { $set: req.body })
    .exec()
    .then((response) => {
      console.log("Profile Update Successfully" + response);
      res.status(200).json({
        message: "Profile Upated Successfully",
        response,
      });
    })
    .catch((err) => {
      console.log("profile update error" + err);
      res.status(500).json({ "profile Update err": err });
    });
};

exports.getAllCustomer = (req, res) => {
  Customer.find()
    .select("name email_id")
    .exec()
    .then((results) => {
      const response = {
        count: results.length,
        products: results.map((result) => {
          return {
            name: result.name,
            email: result.email,
            _id: result._id,
            request: {
              type: "GET",
              url:
                "http://localhost:3000/customer/account/findCustById/" +
                result._id,
            },
          };
        }),
      };
      if (results.length > 0) {
        res.status(200).json({ response });
      } else {
        res.status(200).json("Empty List");
      }
    })
    .catch((err) => {
      console.log("Get All customer  error" + err);
      res.status(500).json({ "get all customer err": err });
    });
};

exports.findCustById = (req, res) => {
  Customer.findById({ _id: req.params.custId })
    .select("name email_id")
    .exec()
    .then((result) => {
      if (result) {
        return res.status(200).json({
          name: result.name,
          email: result.email,
          _id: result._id,
        });
      } else {
        res.status(400).json({ message: "Invalid Id" });
      }
    })
    .catch((err) => {
      console.log("Find Customer By error" + err);
      res.status(500).json({ "Find customer By Id": err });
    });
};

exports.deleteCustomer = (req, res) => {
  Customer.deleteOne({ _id: req.params.custId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Account Deleted Successfully",
      });
    })
    .catch((err) => {
      console.log("delete customer  error" + err);
      res.status(500).json({ "delete customer err": err });
    });
};
