'use strict';

var React 	= require('react/addons'),
		$ 	= require('jquery'),
Showdown 	= require('showdown');

require('styles/MImage.scss');

var converter = new Showdown.converter();


var MImage = React.createClass({
	getInitialState: function(){
	//console.log("INIT");
     return({parent: this.props.parent, img_ref: this.props.img_ref, img_md:"", text_md:"", top: this.props.top, bottom:this.props.bottom});
  
  },
  
  componentDidMount: function(){
  		//console.log("MOUNT");
  },

 	mouseEnter: function(){

 	},

 	mouseLeave: function(){
		//$(this.getDOMNode(),'img').removeClass('display_none');
		//$(this.getDOMNode(),'input').addClass('display_none');
 	},

 	mouseClick: function(){
 		var img = $(this.getDOMNode()).find('img');
 		var input = $(this.getDOMNode()).find('input');
 		var imgText = $(this.getDOMNode()).find('.imgText');

 		img.toggleClass('img-hovered');
 		input.toggleClass('hidden');

 			if(input.hasClass('hidden')){
 			 		imgText.removeClass('hidden');
 			}else{
 				if(!imgText.hasClass('hidden')){
					imgText.addClass('hidden');
 				}
 			}
 		

 		
	 	//	$(this.getDOMNode(),'input').removeClass('display_none');
 	},

 	inputChange: function(e){
 		this.setState({text_md: e.target.value}); 	
 		//this.state.text_md = e.target.value;	
 		//console.log(this.state.text_md);
 		this.state.parent.updateImage(this.state.img_ref,this.state.img_md,this.state.text_md);
 	},

 	componentWillReceiveProps: function(){
 		//this.setState({parent: this.props.parent, img_md:this.props.img_md, text_md:this.props.text_md});
 		var input = $(this.getDOMNode()).find('input');
 		input.addClass('hidden');
 	},
 	componentDidUpdate: function(){

 	},


	render: function(){
    this.state.img_md = this.props.img_md;

    var imgMarkup = converter.makeHtml( this.props.img_md );
    var textMarkup = converter.makeHtml( this.state.text_md );

		return(
			<div className="MImage"> 
				<div dangerouslySetInnerHTML={{__html: imgMarkup}} /> 
			</div>
			);
	},


	render2: function(){
    this.state.img_md = this.props.img_md;

    var imgMarkup = converter.makeHtml( this.state.img_md );
    var textMarkup = converter.makeHtml( this.state.text_md );

		return(
			<div 	
						className="MImage"> 
						<div 	onClick={this.mouseClick}
									onMouseEnter={this.mouseEnter} 
									onMouseLeave={this.mouseLeave}
									dangerouslySetInnerHTML={{__html: imgMarkup}}/>

						<span className="imgText hidden" dangerouslySetInnerHTML={{__html: textMarkup}}/>

						<input onChange={this.inputChange} type="text" className="form-control hidden" value={this.state.text_md}/>
						</div>
			);
	}

});

module.exports = MImage; 

