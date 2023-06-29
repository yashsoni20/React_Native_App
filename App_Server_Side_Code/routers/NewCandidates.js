const { NewCandidate } = require("../models/NewCandidate");
const express = require("express");
const { Router } = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
//MAIL SYSTEM
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../env");
const Mailgen = require("mailgen");

// function for upload Image
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/heif": "heif",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");

    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];

    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});
const uploadOptions = multer({ storage: storage });

// Create a Multer storage configuration
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "public/uploads/products");
    // Set the destination based on the file type
    if (file.mimetype === 'application/pdf') {
      cb(null, 'public/uploads/pdf');
    } else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, 'public/uploads/profile');
    } else {
      cb(new Error('Invalid file type'));
    }
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + "-" + file.originalname.split(" ").join("-"));
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let directory;
    if (file.mimetype === 'application/pdf') {
      directory = 'pdf';
    } else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      directory = 'profile';
    } else {
      cb(new Error('Invalid file type'));
      return;
    }
    const fileName = Date.now() + '-' + file.originalname.split(' ').join('-');
    const filePath = `${fileName}`;
    cb(null, filePath);
  },
 
});

// Create the Multer upload instance
const upload = multer({ storage: storage2 });



//API TO ADD A NewCandidate
router.post(
  `/`,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "ResumeUpload", maxCount: 1 },
  ]),
  async (req, res) => {
  

    const pdfFile = req.files["ResumeUpload"][0];
    const imageFile = req.files["image"][0];
    // const img = toString(imageFile)
    // console.log(img)

    // console.log("PDF File uploaded:", pdfFile.originalname);
    // console.log("PDF File path:", pdfFile.path);

    // console.log("Image File uploaded:", imageFile.originalname);
    // console.log("Image File path:", imageFile.path);

    // const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    let newcandidate = new NewCandidate({ 
      FullName: req.body.FullName,
      City: req.body.City,
      Country: req.body.Country,
      JobTitle: req.body.JobTitle,
      CompanyName: req.body.CompanyName,
      LinkedinLink: req.body.LinkedinLink,
      FacebookLink: req.body.FacebookLink,
      PersonalEmail: req.body.PersonalEmail,
      ProfessionalEmail: req.body.ProfessionalEmail,
      PersonalPhoneNumber: req.body.PersonalPhoneNumber,
      HighestQualification: req.body.HighestQualification,
      GraduationYear: req.body.GraduationYear,
      Salary: req.body.Salary,
      JobDescription: req.body.JobDescription,
      ResumeUpload: `${basePath}pdf/${pdfFile.filename}`,
      Status: req.body.Status,
      image: `${basePath}profile/${imageFile.filename}`,
      JdId: req.body.JdId,
      userID: req.body.userID,
    });

    newcandidate = await newcandidate.save();

    if (!newcandidate)
      return res.status(500).send("New Candidate cannot be created");

    res.send(newcandidate);
  }
);



//PDF UPLOAD

// Delete a candidate
router.delete("/:id", (req, res) => {
  NewCandidate.findByIdAndRemove(req.params.id)
    .then((newcandidate) => {
      if (newcandidate) {
        return res
          .status(200)
          .json({ success: true, message: "the New Candidate is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "New Candidate not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ succes: false, error: err });
    });
});

//To Update a candidate
router.put("/:id", uploadOptions.single("image"), async (req, res) => {
  // this by default update the detal but sen the old one only so new :  true then this will show you updated one !
  const file = req.file;
  if (!file) return res.status(400).send("No image Upload");

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  const newcandidate = await NewCandidate.findByIdAndUpdate(
    req.params.id,
    {
      FullName: req.body.FullName,
      City: req.body.City,
      Country: req.body.Country,
      JobTitle: req.body.JobTitle,
      CompanyName: req.body.CompanyName,
      LinkedinLink: req.body.LinkedinLink,
      FacebookLink: req.body.FacebookLink,
      PersonalEmail: req.body.PersonalEmail,
      ProfessionalEmail: req.body.ProfessionalEmail,
      PersonalPhoneNumber: req.body.PersonalPhoneNumber,
      HighestQualification: req.body.HighestQualification,
      GraduationYear: req.body.GraduationYear,
      Salary: req.body.Salary,
      JobDescription: req.body.JobDescription,
      ResumeUpload: req.body.ResumeUpload,
      Status: req.body.Status,
      image: `${basePath}${fileName}`,
      userID: req.body.userID,
    },
    { new: true }
  );

  if (!newcandidate)
    return res.status(500).send("the new candidate cannot be updated");

  res.status(200).send(newcandidate);
});

//Status Update Api for selected rejected
router.put("/status/:id", async (req, res) => {
  // this by default update the detal but sen the old one only so new :  true then this will show you updated one !

  const newcandidate = await NewCandidate.findByIdAndUpdate(
    req.params.id,
    {
      Status: req.body.Status,
    },
    { new: true }
  );

  if (!newcandidate) return res.status(500).send("Status Updated");

  res.status(200).send(newcandidate);
});

//Get all NC list
router.get(`/`, async (req, res) => {
  const newcandidatelist = await NewCandidate.find(); // we doent want people to see password of user so we remove that feild  .select('-passwordHash')
  if (!newcandidatelist) {
    res.status(401).json({ success: false });
  }
  res.send(newcandidatelist);
});

//Send Email On Post a Candidate
router.post("/Email", async (req, res) => {
  let SendEmail = req.body.SendEmail;
  let FullName = req.body.FullName;
  let PersonalEmail = req.body.PersonalEmail;
  let HighestQualification = req.body.HighestQualification;
  let GraduationYear = req.body.GraduationYear;
  let ClientName = req.body.ClientName;
  let ClientEmail = req.body.ClientEmail;

  if (!SendEmail) {
    res.status(500).json({ message: "No Email" });
  }
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Aifetch",
      link: "https://aifetch.co",
    },
  });

  let response = {
    body: {
      name: "Himank",
      intro: "New Candidate Has Been Posted",
      table: {
        data: [
          {
            FullName: FullName,
            PersonalEmail: PersonalEmail,
            HighestQualification: HighestQualification,
            GraduationYear: GraduationYear,
            ClientName: ClientName,
            ClientEmail: ClientEmail,
          },
        ],
      },
      outro: "Go And Check Now!",
    },
  };
  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: [SendEmail],
    subject: "Place Order",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should recieve an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error });
    });
});

// To get count of Candidates In JD with selected And rejected
router.get("/NC/Count/:id", async (req, res) => {
  const NCcount = await NewCandidate.countDocuments({ JdId: req.params.id });
  const NCScount = await NewCandidate.countDocuments({
    JdId: req.params.id,
    Status: 1,
  });
  const NCRcount = await NewCandidate.countDocuments({
    JdId: req.params.id,
    Status: 2,
  });
  if (!NCcount) {
    res.status(303).json({ sucess: false });
    return;
  }
  res.send({
    NCcount: NCcount,
    NCScount: NCScount,
    NCRcount: NCRcount,
  });
});

module.exports = router;
