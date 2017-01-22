// wrapper for tonejs pattern

// a part take a dictionary of mel that he plays according
// a form aka an array of indices

// its like TONE pattern, except it waits for the end of a melody
// to go up
//
// pour la forme
// le set est un array
// la string peut être de deux natures
// => lettre signifie successif "aaba"
// => nb signifie les poids ? "9999"

var Part= function (dict,set,forme,depart=0) {
  this.count=-1;
  this.dict=dict;
  if (set=="all") {
    this.cb=function () {
      for(var mel in this.dict){
        this.dict[mel].start()
      }
    }.bind(this)
  }else
  {
    this.set=set || makeForme(Object.keys(dict).length)
    this.forme= new Tone.CtrlPattern(this.set,forme);
    var cb=function (time) {
      // console.log("gogo");
      this.mel.stop()
      this.mel=this.next();
      this.mel.start(0);
      this.id=Tone.Transport.schedule(cb,Tone.Time().addNow().add(this.mel.dur()))
    }.bind(this);
  }
  this.mel=this.dict[depart]
}
Part.prototype={
  start:function () {
    // lets play callback
    // recursive callback function
    // play a mel, and trigger next mel after the first is finished
    Tone.Transport.schedule(this.cb)
  },
  stop:function () {
    console.log(this.mel);
    this.mel.stop();
    if (this.id) {
      Tone.Transport.clear(this.id)
    }
  },
  next:function (part) {
    // go counter
    this.count += 1 // for now, pure information
    // if part is specified, go for it
    if (part < this.dict.length) {
      return this.dict[this.forme[part]]
    }else{
      console.log(this.forme.value);
      // returns the mel in dict at index according to forme pattern...
      var res=this.dict[this.forme.value]
      //  ... that we increment
      this.forme.next()
      return res
    }
  }
}