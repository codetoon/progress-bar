jQuery(document).ready(function() {
    //Progressbar Init
    ProgressBar = function(args) {
    	//Outer Selector
        this.id = args.selector;
        //Progressbar height
        if (typeof(args.height) != 'undefined' && args.height != "") {
            this.height = args.height;
        } else {
            this.height = 14;	//Default Height
        }

        //Default Background color
        if (typeof(args.backgroundColor) != 'undefined' && args.backgroundColor != "") {
            this.defaultBgColor = args.backgroundColor;
        } else {
            this.defaultBgColor = "#d8d8d8";	//Default Background Color
        }


        //Default Active Bar Color
        if (typeof(args.activeColor) != 'undefined' && args.activeColor != "") {
            this.defaultActiveColor = args.activeColor;
        } else {
            this.defaultActiveColor = "#2a93c7";	//Default Active Color
        }

        this.blocks = [];

        //Add ProgressBar blocks
        this.addBlock = function(blockObj) {
            var obj = {};
            obj.label = blockObj.label; //Block label
            obj.cssClass = blockObj.cssClass; //Block css class
            obj.width = blockObj.width; //Block width
            obj.blockStyle = blockObj.blockStyle; //Block custom style
            obj.bgColor = blockObj.bgColor; //Block custom background
            obj.activeColor = blockObj.activeColor; //Block custom active color
            this.blocks.push(obj);
        };

        //Draw Progressbar
        this.draw = function() {
            var mainContainer = 'progressbar';
            var progressbarHeight = this.height / 2;

            jQuery('#' + this.id).append('<div class="' + mainContainer + '"></div>');

            for (i = 0; i < this.blocks.length; i++) {

                var block = this.blocks[i];

                var lastBlock = false;
                if (i + 1 == this.blocks.length)
                    lastBlock = true;

                //Css class for block
                var css = '';
                if (typeof(block.cssClass) != 'undefined') {
                    css = block.cssClass;
                }
                if (lastBlock)
                    css = css + " last";

                //Label for the block
                var label = '';
                if (typeof(block.label) != 'undefined') {
                    label = block.label;
                }

                //Total Width of block
                var width = 'auto';
                if (typeof(block.width) != 'undefined' && block.width != '') {
                    width = 'calc(' + block.width + ' - ' + (progressbarHeight + 2) + 'px)';
                }

                //Block style
                var blockStyle = '';
                if (typeof(block.blockStyle) != 'undefined' && block.blockStyle != '') {
                    blockStyle = block.blockStyle;
                }

                //Block background color
                //Possible values: [red, #555, (255, 100, 10)]
                if (typeof(block.bgColor) != 'undefined' && block.bgColor != '') {
                    block.bgColor = block.bgColor;
                } else {
                    block.bgColor = this.defaultBgColor;
                }

                var bgColor = '';
                var bgArrow = '';

                bgColor = 'border-top:' + progressbarHeight + 'px solid ' + block.bgColor + '; border-bottom: ' + progressbarHeight + 'px solid ' + block.bgColor + ';border-left: ' + progressbarHeight + 'px solid #fff;';
                if (i == 0) {
                    bgColor = bgColor + 'border-left: ' + progressbarHeight + 'px solid ' + block.bgColor + '; border-radius: ' + progressbarHeight + 'px 2px 2px ' + progressbarHeight + 'px;';
                } else if (lastBlock) {
                    bgColor = bgColor + ' border-radius: 0 ' + progressbarHeight + 'px ' + progressbarHeight + 'px 0;';
                }
                bgArrow = 'border-left: ' + progressbarHeight + 'px solid ' + block.bgColor + '; border-top: ' + progressbarHeight + 'px solid transparent; border-bottom: ' + progressbarHeight + 'px solid transparent;margin-top: -' + progressbarHeight + 'px;margin-right: -' + progressbarHeight + 'px;'


                //Block active background color
                //Possible values: [red, #555, (255, 100, 10)]
                var activeBar = '';
                var activeLabel = '';
                var activeBarArrow = '';

                var activeColor = this.defaultActiveColor;
                if (typeof(block.activeColor) != 'undefined' && block.activeColor != '') {
                    activeColor = block.activeColor;
                }

                activeBar = 'display:none; border-top: ' + progressbarHeight + 'px solid ' + activeColor + '; border-bottom: ' + progressbarHeight + 'px solid ' + activeColor + ';border-left: ' + progressbarHeight + 'px solid transparent;margin-top: -' + progressbarHeight + 'px;margin-left: -' + progressbarHeight + 'px;';

                if (i == 0) {
                    activeBar = activeBar + ' border-left: ' + progressbarHeight + 'px solid ' + activeColor + '; border-radius: ' + progressbarHeight + 'px 2px 2px ' + progressbarHeight + 'px;';
                } else if (lastBlock) {
                    activeBar = activeBar + ' max-width: calc(100% - ' + progressbarHeight + 'px)';
                }

                activeLabel = 'color: ' + activeColor + ';';

                activeBarArrow = 'border-left: ' + progressbarHeight + 'px solid ' + activeColor + ';border-top: ' + progressbarHeight + 'px solid transparent;border-bottom: ' + progressbarHeight + 'px solid transparent; margin-right: -' + progressbarHeight + 'px; margin-top: -' + progressbarHeight + 'px;';

                jQuery('#' + this.id + ' .' + mainContainer).append('<div id="probar' + (i + 1) + '" class="bg-progressbar ' + css + '" style="width:' + width + ';' + blockStyle + bgColor + '">' +
	                    '<span class="right-arrow" style="' + bgArrow + '"></span>' +
	                    '<div class="inner-bar" style="' + activeBar + '">' +
	                    	'<span class="right-arrow" style="' + activeBarArrow + '"></span>' +
	                    '</div>' +
	                    '<div class="label" style="">' + label + '</div>' +
                    '</div>');
            }
        };

        var change_width = function(selector, width) {
            jQuery(selector).animate({
                "width": width
            }, 500).css('overflow', 'visible', 'important');
        };

        //Progressbar Increment
        this.inc = function(block) {
            var obj = {};
            obj.blockId = block.blockId; //ID
            obj.inc = block.val; //Inc => Value in %
            jQuery('#' + this.id + ' #probar' + obj.blockId + ' .inner-bar, #' + this.id + ' #probar' + obj.blockId).show();
            jQuery('#' + this.id + ' #probar' + obj.blockId).addClass("active");
            var outer_bar_width = parseFloat(jQuery('#' + this.id + ' #probar' + obj.blockId).width());
            var main_bar_width = parseFloat(jQuery('#' + this.id + ' #probar' + obj.blockId + ' .inner-bar').width());
            var new_width = main_bar_width + outer_bar_width / 100 * obj.inc;
            var selector = '#' + this.id + ' #probar' + obj.blockId + ' .inner-bar';
            var get_border_color = jQuery(selector + ' .right-arrow').css("border-left-color");
            if (jQuery('#' + this.id + ' #probar' + obj.blockId).hasClass("last") && (outer_bar_width - new_width <= this.height)) {
                
                jQuery(selector + ' .right-arrow').css({
                    'border-top-color': get_border_color,
                    'border-bottom-color': get_border_color,
                    'border-radius': '0 '+this.height+'px '+this.height+'px 0'
                }, 500);
                change_width(selector, new_width);
            } else {
                change_width(selector, new_width);
            }
            jQuery('#' + this.id + ' #probar' + obj.blockId+ " .label").css({'color':get_border_color});
        };

        //Progressbar Decrement
        this.dec = function(block) {
            var obj = {};
            obj.blockId = block.blockId; //ID
            obj.dec = block.val; //Dec => Value in %
            var outer_bar_width = parseFloat(jQuery('#' + this.id + ' #probar' + obj.blockId).width());
            var main_bar_width = parseFloat(jQuery('#' + this.id + ' #probar' + obj.blockId + ' .inner-bar').width());
            var new_width = main_bar_width - outer_bar_width / 100 * obj.dec;
            var selector = '#' + this.id + ' #probar' + obj.blockId + ' .inner-bar';

            if ( jQuery('#' + this.id + ' #probar' + obj.blockId).hasClass("last") && (outer_bar_width - new_width > this.height)) {
                jQuery(selector + ' .right-arrow').css({
                    'border-top-color': 'transparent',
                    'border-bottom-color': 'transparent'
                });
                jQuery(selector).animate({
                    "width": new_width + 'px'
                }, 500).css('border-radius', '0');
            } else {
                change_width(selector, new_width);
            }
            if (new_width < 2) {
                jQuery(selector).fadeOut(100);
                jQuery('#' + this.id + ' #probar' + obj.blockId).removeClass("active");
                jQuery('#' + this.id + ' #probar' + obj.blockId+ " .label").css({'color':""});
            }
        };

        //Progressbar Reset
        this.reset = function(block) {
            var obj = {};
            obj.blockId = block.blockId; //ID
            var new_width = 0;
            var selector = '#' + this.id + ' #probar' + obj.blockId + ' .inner-bar';
            change_width(selector, new_width);
            jQuery(selector).fadeOut(100);
            jQuery('#' + this.id + ' #probar' + obj.blockId).removeClass("active");
        };

    };
});