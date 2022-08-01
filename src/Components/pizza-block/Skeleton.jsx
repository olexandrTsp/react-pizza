import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    
  >
    <circle cx="130" cy="130" r="125" /> 
    <rect x="0" y="275" rx="9" ry="9" width="280" height="32" /> 
    <rect x="0" y="328" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="437" rx="10" ry="10" width="95" height="30" /> 
    <rect x="125" y="431" rx="23" ry="23" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton

