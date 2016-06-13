riot.tag2('photo-card', '<div class="col s4"> <div class="card"> <photo-image url="{opts.data.url_m}" title="{opts.data.title}" height="{opts.data.height_m}"></photo-image> <photo-tags tags_array="{this.tagsArray}"></photo-tags> </div> </div>', '', '', function(opts) {
        this.tagsArray = opts.data.tags.split(" ")
});