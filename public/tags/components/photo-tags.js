riot.tag2('photo-tags', '<div if="{this.showTags}" class="card-action"> <chip-tag each="{item in opts.tags_array}" data="{item}"></chip-tag> </div>', '', '', function(opts) {
        this.showTags = numOfTags() > 0 ? true : false;

        function numOfTags () {
            if (opts.tags_array.length == 1) {
                if (opts.tags_array[0] == "") {
                    return 0;
                }
            } else {
                return opts.tags_array.length;
            }
        }
});