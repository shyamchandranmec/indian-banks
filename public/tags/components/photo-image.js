riot.tag2('photo-image', '<div class="card-image"> <img name="image" class="materialboxed" riot-src="{opts.url}" data-title="{opts.title}" height="{opts.height}"> <span class="card-title">{opts.title.substring(0,20)}</span> </div>', '', '', function(opts) {
        this.on("update",function () {
            $('img', this.root).materialbox();
        })
});