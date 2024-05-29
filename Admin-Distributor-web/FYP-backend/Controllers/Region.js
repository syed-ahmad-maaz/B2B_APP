const Region = require("../Models/Region");

exports.GetallRegionList = async (req, res, next) => {
  Region.find()
    .populate("AdminId", "name")
    .then((result) => {
      res.status(200).json({
        regiondata: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.UpdateRegion = async (req, res, next) => {
  const c = await Region.find();
  if (c.length > 0) {
    let check = false;
    for (let i = 0; i < c.length; i++) {
      if (c[i]["region"].toLowerCase() === req.body.region.toLowerCase()) {
        console.log(req.body.region);
        check = true;
        res.status(400).send({ success: false, msg: "duplicatee" });
        console.log("matched its duplicate");

        break;
      }
    }
    if (check === false) {
      Region.updateOne(
        { _id: req.params.id },
        { $set: { region: req.body.region, capital: req.body.capital } }
      )
      
        .then((result) => {
          res.status(200).json(result);
          console.log("Region Updated by Sheharyar Khalid ");
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  }
};

exports.DeleteRegion = async (req, res) => {
  try {
    const regiondelete = await Region.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    }
    res.send(regiondelete);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.PostRegion = async (req, resp, next) => {
  try {
    const c = await Region.find();

    if (c.length > 0) {
      let check = false;
      for (let i = 0; i < c.length; i++) {
        if (c[i]["region"].toLowerCase() === req.body.region.toLowerCase()) {
          console.log(req.body.region);
          check = true;
          console.log("matched its duplicate");
          break;
        }
      }

      if (check === false) {
        const region = req.body.region;
        const capital = req.body.capital;
        let regioncreate = new Region({
          region: region,
          capital: capital,

          AdminId: req.AdminId,
        });

        regioncreate.save().then((result) => {
          resp.status(200).send({ success: true, msg: "created" });
          console.log(
            "Region created Successfully with referencing(Admin_Id) "
          );
        });
      } else {
        resp.status(400).send({ success: false, msg: "duplicatee" });
      }
    } else {
      const region = req.body.region;
      const capital = req.body.capital;

      let regioncreate = new Region({
        region: region,
        capital: capital,

        AdminId: req.AdminId,
      });

      regioncreate.save().then((result) => {
        resp.status(200);
        console.log("Region created Successfully with referencing(Admin_Id) ");
      });
    }
  } catch (error) {
    resp.status(400).send({ success: false, msg: error.message });
  }
};
