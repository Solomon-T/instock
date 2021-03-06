const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Report = require('../../models/Report');
const validateReportInput = require('../../validation/reports');

router.get('/test', (req, res) => {
    res.json({ msg: 'Welcome to reports'})
});

router.post('/',
    
    (req, res) => {
        // const { errors, isValid } = validateReportInput(req.body);
        
        // if (!isValid) {
        //     return res.status(600).json(errors);
        // }

        const newReport = new Report({
            reporterId: req.body.reporterId,
            reporterName: req.body.reporterName,
            vendorPlaceId: req.body.vendorPlaceId,
            vendorName: req.body.vendorName,
            vendorAddress: req.body.vendorAddress,
            vendorPhone: req.body.vendorPhone,
            vendorLat: req.body.vendorLat,
            vendorLng: req.body.vendorLng,
            approvals: 1,
        });

        newReport.save()
            .then(report => res.json(report));
    }
);

router.patch('/update', (req, res) => {
    Report.findById(req.body.id).then((report) => {
        report.approvals += 1;
        report.save();
        res.json(report)
    })
})


router.patch('/downDate', (req, res) => {
    Report.findById(req.body.id).then((report) => {
        if (report.approvals > 0) {
            report.approvals -= 1;
            report.save();
            res.json(report)
        }
        else {
            res.json(report)
        }
    })
})


router.get("/:placeId", (req, res) => {

  Report.find({ placeId: req.params.placeId })
    .sort({ date: -1 })
    .then((reports) => res.json(reports))
    .catch((err) =>
      res
        .status(404)
        .json({ noReportsFound: "No reports found for this location" })
    );
});


router.get('/', (req, res) => {
    
    Report.find()
        .sort({ date: -1 })
        .then(reports => res.json(reports))
        .catch(err => res.status(404).json({ noReportsFound: 'No reports found' }));
});


router.get('/:id', (req, res) => {
    
    Report.findById(req.params.id)
        .then(report => res.json(report))
        .catch(err =>
            res.status(404).json({ noreportfound: 'No report found with that ID' })
        );
});

router.get('/user/:user_id', (req, res) => {
    Report.find({ reporterId: req.params.user_id })
        .sort({ date: -1 })
        .then(reports => res.json(reports))
        .catch(err =>
            res.status(404).json({ noReportsFound: 'No reports found from that user' }
            )
        );
});


module.exports = router;