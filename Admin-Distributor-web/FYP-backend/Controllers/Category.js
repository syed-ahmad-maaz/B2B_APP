const Category = require("../Models/Category");

exports.CreateNewCategory = async (req, resp, next) => {
  try {
    const c = await Category.find();

    if (c.length > 0) {
      let check = false;
      for (let i = 0; i < c.length; i++) {
        
          if(c[i]['category_name'].toLowerCase()===req.body.category_name.toLowerCase())
         {
          console.log(req.body.category_name);
          check = true;
          console.log("matched its duplicate");
          break;
        }
      }

      if (check === false) {
        const category_name = req.body.category_name;

        let categorycreate = new Category({
          category_name: category_name,

          AdminId: req.AdminId,
        });
        if (req.file) {
          categorycreate.CategoryImage = req.file.path;
        }

        categorycreate.save().then((result) => {
          resp.status(200).send({ success: true, msg: "created" });
          console.log(
            "Category created Successfully with referencing(Admin_Id) "
          );
        });
      } else {
        resp.status(400).send({ success: false, msg: "duplicatee" });
        // resp.send("Duplicatee")
      }
    } else {
      const category_name = req.body.category_name;

      let categorycreate = new Category({
        category_name: category_name,

        AdminId: req.AdminId,
      });
      if (req.file) {
        categorycreate.CategoryImage = req.file.path;
      }

      categorycreate.save().then((result) => {
        resp.status(200);
        console.log(
          "Category created Successfully with referencing(Admin_Id) "
        );
      });
    }
  } catch (error) {
    resp.status(400).send({ success: false, msg: error.message + "hello" });
  }
};




exports.GetallCategoryList = async (req, res, next) => {
  Category.find()
    .populate("AdminId", "name")
    .then((result) => {
      res.status(200).json({
        categorydata: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.UpdateCategory = async (req, res, next) => {
  // const match = await Category.findOne({
  //   category_name: req.body.category_name,
  // });
  const c = await Category.find();
  if (c.length > 0) {
    let check = false;
    for (let i = 0; i < c.length; i++) {
     if(c[i]['category_name'].toLowerCase()===req.body.category_name.toLowerCase()){
        console.log(req.body.category_name);
        check = true;
        res.status(400).send({ success: false, msg: "duplicatee" });
        console.log("matched its duplicate");

        break;
      }
    }
    if (check === false) {
      if (req.file) {
        Category.updateOne(
          { _id: req.params.id },
          {
            $set: {
              category_name: req.body.category_name,
              CategoryImage: req.file.path,
            },
          }
        )
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      } else {
        Category.updateOne(
          { _id: req.params.id },
          { $set: { category_name: req.body.category_name } }
        )
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      }
      
  }
}
  


 

  
};

exports.DeleteCategory = async (req, res) => {
  try {
    const deletecategory = await Category.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    }
    res.send(deletecategory);
  } catch (e) {
    res.status(500).send(e);
  }
};
