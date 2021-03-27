jQuery(document).ready(function () {
    jQuery('.page1').click(function () {
        jQuery('.content1').show();
        jQuery('.content2').hide();
        jQuery('.content3').hide();
        jQuery('.content4').hide();
        jQuery('.content5').hide();
        return false;
    });
    jQuery('.page2').click(function () {
        jQuery('.content1').hide();
        jQuery('.content2').show();
        jQuery('.content3').hide();
        jQuery('.content4').hide();
        jQuery('.content5').hide();
        return false;
    });
    jQuery('.page3').click(function () {
        jQuery('.content1').hide();
        jQuery('.content2').hide();
        jQuery('.content3').show();
        jQuery('.content4').hide();
        jQuery('.content5').hide();
        return false;
    });
    jQuery('.page4').click(function () {
        jQuery('.content1').hide();
        jQuery('.content2').hide();
        jQuery('.content3').hide();
        jQuery('.content4').show();
        jQuery('.content5').hide();
        return false;
    });
    jQuery('.page5').click(function () {
        jQuery('.content1').hide();
        jQuery('.content2').hide();
        jQuery('.content3').hide();
        jQuery('.content4').hide();
        jQuery('.content5').show();
        return false;
    });
});
