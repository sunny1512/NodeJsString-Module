var SMP = function (){
	var lib={};
	function Suffixstruct() {
		this.index = -1;
		this.mrank = -1;
		this.nrank = -1;
	};	
	function compareSuffixes(a,b){
			if (a.mrank==b.mrank){
				return a.nrank-b.nrank;
			}
			return (a.mrank - b.mrank);
	};
	lib.getSuffixArray = function(str){
		if(!(typeof str === "string" || str instanceof String)){
			throw new Error("Type mismatch exception");
		}
		var msteps=Math.ceil(Math.log(str.length));
		var suffixes=new Array(str.length);
		for(var i=0;i<str.length;i++){
			suffixes[i]= new Suffixstruct();
			suffixes[i].index=i; 
			suffixes[i].mrank=str.charCodeAt(i)-97;
			suffixes[i].nrank=(i+1)>=str.length ? -1 : str.charCodeAt(i+1)-97;
		}
		suffixes.sort(compareSuffixes);
		for(var i=2;i<=msteps;i++){
			var rank=0;
			var prevrank=suffixes[0].mrank;
			suffixes[0].mrank=rank;
			var ind=new Array(str.length);
			ind[suffixes[0].index]=0;
			for(var j=1;j<str.length;j++){
				if(prevrank == suffixes[j].mrank && suffixes[j].nrank==suffixes[j-1].nrank){
					prevrank=suffixes[j].mrank;
					suffixes[j].mrank=rank;
				}
				else{
						prevrank=suffixes[j].mrank;
						suffixes[j].mrank=++rank;
				}
				ind[suffixes[j].index]=j;
			}
			var nextindex;
			for(var j=0;j<str.length;j++){
				nextindex=suffixes[j].index+(1<<(i-1));
				suffixes[j].nrank = nextindex>=str.length ? -1 : suffixes[ind[nextindex]].mrank;
			}
			suffixes.sort(compareSuffixes);
		}
		var a=new Array(str.length);
		for(var i=0;i<str.length;i++){
			a[i]=suffixes[i].index;
		}
		return a;
	};	
	return lib;
};
module.exports=SMP();