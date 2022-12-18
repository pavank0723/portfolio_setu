export const swaggerCustomUI = `
:root {
  --post-color: #F5A50D;
  --get-color: #CCA300;
  --get_id-color: #FFCC00;
  --put-color: #FFE066;
  --delete-color: #665200;
  --body-color: #fffce9;
  --topbar-color : #fffebe;
}
body {
  background:  var(--body-color);
}
.swagger-ui .topbar {
  background-color: var(--topbar-color);
}
.topbar-wrapper img {content:url(\'../assets/portfolioSetu_logo.png\'); width:260px; height:auto;}

.swagger-ui .opblock.opblock-get {
  border-color: #61affe;
  background: rgba(97, 175, 254, .1)
}

.swagger-ui .opblock.opblock-get .opblock-summary-method {
  background: #61affe
}

.swagger-ui .opblock.opblock-get .opblock-summary {
  border-color: #61affe
}

.swagger-ui .opblock.opblock-patch {
  border-color: #50e3c2;
  background: rgba(80, 227, 194, .1)
}

.swagger-ui .opblock.opblock-patch .opblock-summary-method {
  background: #50e3c2
}

.swagger-ui .opblock.opblock-patch .opblock-summary {
  border-color: #50e3c2
}

.swagger-ui .opblock.opblock-head {
  border-color: #9012fe;
  background: rgba(144, 18, 254, .1)
}

.swagger-ui .opblock.opblock-head .opblock-summary-method {
  background: #9012fe
}

.swagger-ui .opblock.opblock-head .opblock-summary {
  border-color: #9012fe
}

.swagger-ui .opblock.opblock-options {
  border-color: #0d5aa7;
  background: rgba(13, 90, 167, .1)
}

.swagger-ui .opblock.opblock-options .opblock-summary-method {
  background: #0d5aa7
}

.swagger-ui .opblock.opblock-options .opblock-summary {
  border-color: #0d5aa7
}

.swagger-ui .opblock.opblock-deprecated {
  opacity: .6;
  border-color: #ebebeb;
  background: hsla(0, 0%, 92%, .1)
}

.swagger-ui .opblock.opblock-deprecated .opblock-summary-method {
  background: #ebebeb
}

.swagger-ui .opblock.opblock-deprecated .opblock-summary {
  border-color: #ebebeb
}


 .swagger-ui .opblock.opblock-post {
   border-color: #DADFE1;
   background: rgba(241, 241, 241, .1);
 }

 .swagger-ui .opblock.opblock-post .opblock-summary-method {
   background: var(--post-color);
 }

 .swagger-ui .opblock.opblock-post .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-put {
   border-color: #DADFE1;
   background: rgba(241, 241, 241, .1);
 }

 .swagger-ui .opblock.opblock-put .opblock-summary-method {
   background: var(--put-color);
 }

 .swagger-ui .opblock.opblock-put .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-delete {
   border-color: #DADFE1;
   background: rgba(241, 241, 241, .1);
 }

 .swagger-ui .opblock.opblock-delete .opblock-summary-method {
   background: var(--delete-color);
 }

 .swagger-ui .opblock.opblock-delete .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-get {
   border-color: #DADFE1;
   background: rgba(241, 241, 241, .1);
 }

 .swagger-ui .opblock.opblock-get .opblock-summary-method {
   background: var(--get-color);
 }

 .swagger-ui .opblock.opblock-get .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-patch {
   border-color: #DADFE1;
   background: rgba(241, 241, 241, .1);
 }

 .swagger-ui .opblock.opblock-patch .opblock-summary-method {
   background: var(--put-color);
 }

 .swagger-ui .opblock.opblock-patch .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-head {
   border-color: #DADFE1;
   background: rgba(241, 241, 241, .1);
 }

 .swagger-ui .opblock.opblock-head .opblock-summary-method {
   background: #5C6BC0;
 }

 .swagger-ui .opblock.opblock-head .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-options {
   border-color: #DADFE1;
   background: rgba(241, 241, 241, .1);
 }

 .swagger-ui .opblock.opblock-options .opblock-summary-method {
   background: var(--put-color);
 }

 .swagger-ui .opblock.opblock-options .opblock-summary {
   border-color: #DADFE1;
 }

`