riot.tag2('chip-tag', '<div class="chip tag" onclick="{filterList}">{opts.data}</div>', '', '', function(opts) {
        this.filterList = function() {
            app.filter = true;
            app.eventBus.trigger(app.constants.filterOnTags, opts.data)
        }.bind(this)
});