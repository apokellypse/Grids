(function(exports) {
// $(document).ready(function() {
  console.log('timeline.js');

  var SELECTORS = {
    TIMELINE_SCRIPT : ".js-timeline-script",
    TIMELINE : ".js-timeline-template"
  };

  var data = {
    events :
    [
      {
        "date":"Oct 2011",
        "title":"learned animation and modeling in 3dsmax",
        "art":1,
        "tools":1,
        "coding":0,
        "happening":0
      },
      {
        "date":"Sep 2012",
        "title":"started photoshop, flash, after fx, illustrator",
        "art":0,
        "tools":1,
        "coding":0,
        "happening":0
      },
      {
        "date":"Oct 2012",
        "title":"interest in websites and computer graphics",
        "art":1,
        "tools":1,
        "coding":0,
        "happening":1
      },
      {
        "date":"Oct 2012",
        "title":"chose CS as major for college",
        "art":0,
        "tools":0,
        "coding":0,
        "happening":1
      },
      {
        "date":"May 2013",
        "title":"graduated from Rochester High School",
        "art":0,
        "tools":0,
        "coding":0,
        "happening":1
      },
      {
        "date":"Aug 2013",
        "title":"entered Cornell University",
        "art":0,
        "tools":0,
        "coding":0,
        "happening":1
      },
      {
        "date":"Aug 2013",
        "title":"took first coding class in Python",
        "art":0,
        "tools":0,
        "coding":1,
        "happening":1
      },
      {
        "date":"Jan 2014",
        "title":"coding class with Java",
        "art":0,
        "tools":0,
        "coding":1,
        "happening":0
      },
      {
        "date":"Feb 2014",
        "title":"started blender and maya?",
        "art":0,
        "tools":1,
        "coding":0,
        "happening":0
      },
      {
        "date":"Jun 2014",
        "title":"created first website",
        "art":1,
        "tools":0,
        "coding":1,
        "happening":1
      },
      {
        "date":"Aug 2014",
        "title":"Siggraph 2014 in vancouver",
        "art":1,
        "tools":1,
        "coding":0,
        "happening":1
      },
      {
        "date":"Aug 2014",
        "title":"first computer graphics class",
        "art":0,
        "tools":0,
        "coding":1,
        "happening":0
      },
      {
        "date":"Aug 2014",
        "title":"coding class with Ocaml",
        "art":0,
        "tools":0,
        "coding":1,
        "happening":0
      },
      {
        "date":"Jan 2015",
        "title":"coding class with C",
        "art":0,
        "tools":0,
        "coding":1,
        "happening":0
      },
      {
        "date":"Jan 2015",
        "title":"took first painting class / used acrylic",
        "art":1,
        "tools":0,
        "coding":0,
        "happening":1
      },
      {
        "date":"May 2015",
        "title":"interned at LinkedIn as webdev",
        "art":1,
        "tools":0,
        "coding":1,
        "happening":1
      },
      {
        "date":"Aug 2015",
        "title":"Siggraph 2015 in LA",
        "art":1,
        "tools":1,
        "coding":0,
        "happening":0
      },
      {
        "date":"Aug 2015",
        "title":"painting class / used watercolor",
        "art":1,
        "tools":0,
        "coding":0,
        "happening":1
      },
      {
        "date":"Aug 2015",
        "title":"first machine learning class with MatLab",
        "art":0,
        "tools":0,
        "coding":1,
        "happening":0
      }
    ]
  };

  // d3.csv("test.csv", function(d) {
  //   console.log(d[0]);
  // });


  console.log(data);
  // console.log(data.events[0].title);

  var source = $(SELECTORS.TIMELINE_SCRIPT).html();
  // console.log(source);
  var template = Handlebars.compile(source);
  // console.log(template);
  $(SELECTORS.TIMELINE).html(template(data));


// });
})(this.timeline = {});