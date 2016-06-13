riot.tag2('home-page', '<div class="container"> <div class="row"> <div class="col-md-4"> <div class="row"> <div class="col-md-12 "> <div class="bank-list"> <select class="form-control" onchange="{this.bankSelected}" name="bank"> <option value="" disabled selected>Select your option</option> <option each="{item in this.banks}" value="{item.bankId}">{item.bankName}</option> </select> </div> </div> </div> <br> <div class="row"> <div class="col-md-12 "> <input class="form-control" id="city" type="text" name="city-input" value="{this.selectedCity}"> </div> </div> </div> <div class="col-md-8"> <div class="jumbotron search-result" each="{item in this.branches}"> <b>Bank Name </b>{item.bank_name} <br> <b>IFSC </b>{item.ifsc} <br> <b>Address </b>{item.address} <br> <b>City </b>{item.city} <br> <b>District </b>{item.district} <br> <b>State </b>{item.state} <br> </div> </div> </div> </div>', '', '', function(opts) {
        var self = this;
        this.banks = [];
        this.cities = [];
        this.branches = [];
        this.selectedCity = null;
        this.bankId = null;
        this.on("mount", function () {
            $("#city", this.root).typeahead()
            axios.get("/banks").then(function (res) {
                console.log(res);
                self.banks = res.data;
                self.update()
            });
        });

        function getBranches () {
            axios.get("/banks/" + self.bankId + "/branches?city=" + self.selectedCity).then(function (res) {
                self.branches = res.data;
                self.update()
            })
        }

        this.bankSelected = function()
        {
            self.bankId = this.bank.value;
            self.branches = [];
            self.cities = [];
            self.selectedCity = null;
            self.update();
            axios.get("/banks/" + self.bankId + "/cities").then(function (res) {
                console.log(res.data)
                $("#city", this.root).typeahead('destroy')
                var bh = new Bloodhound({
                    local: res.data,
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    datumTokenizer: Bloodhound.tokenizers.whitespace
                });
                self.cities = res.data;
                $("#city", this.root).typeahead({
                            minLength: 1,
                            highlight: true,
                            hint: false
                        },
                        {
                            name: 'shyam',
                            source: bh.ttAdapter()
                        }).on('typeahead:selected', function (e, city) {
                    self.selectedCity = city;
                    console.log(self.selectedCity)
                    getBranches();
                })

            })
        }.bind(this)

});

