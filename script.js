jQuery(document).ready(function() {

    var p2 = new ProgressBar({
        selector: 'progressbar-container',
        height: 14
    });

    p2.addBlock({
        label: "Sale",
        cssClass: 'my-class',
        width: "20%",
        blockStyle: '',
        activeColor: '#836dc9'
    });

    p2.addBlock({
        label: "Purchase",
        cssClass: '',
        width: "10%",
        blockStyle: '',
    });


    p2.addBlock({
        label: "General",
        cssClass: '58',
        width: "20%",
        blockStyle: '',
        activeColor: '#ea5986'
    });
    p2.addBlock({
        label: "Get Quotes",
        cssClass: '',
        width: "50%",
        blockStyle: '',
        activeColor: '#46c275'
    });

    p2.draw();

    //*****Progressbar Control*****
    jQuery('#click1 .button').click(function() {
        jQuery(this).unbind("click");
        p2.reset({
            blockId: 1
        });
    });
    jQuery('#click1 .inc').click(function() {
        p2.inc({
            blockId: 1,
            val: "30"
        });
    });
    jQuery('#click1 .dec').click(function() {
        p2.dec({
            blockId: 1,
            val: "30"
        });
    });


    jQuery('#click2 .button').click(function() {
        p2.reset({
            blockId: 2
        });
    });
    jQuery('#click2 .inc').click(function() {
        p2.inc({
            blockId: 2,
            val: "10"
        });
    });
    jQuery('#click2 .dec').click(function() {
        p2.dec({
            blockId: 2,
            val: "10"
        });
    });


    jQuery('#click3 .button').click(function() {
        p2.reset({
            blockId: 3
        });
    });
    jQuery('#click3 .inc').click(function() {
        p2.inc({
            blockId: 3,
            val: "10"
        });
    });
    jQuery('#click3 .dec').click(function() {
        p2.dec({
            blockId: 3,
            val: "10"
        });
    });


    jQuery('#click4 .button').click(function() {
        p2.reset({
            blockId: 4
        });
    });
    jQuery('#click4 .inc').click(function() {
        p2.inc({
            blockId: 4,
            val: "10"
        });
    });
    jQuery('#click4 .dec').click(function() {
        p2.dec({
            blockId: 4,
            val: "10"
        });
    });   
});