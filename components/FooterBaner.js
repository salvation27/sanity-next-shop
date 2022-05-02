import React from 'react'

const FooterBaner = ({footerData}) => (
  <div className="footer-banner-container">
    <div className="banner-desc">
      <div className="left">
        <h2>{footerData.title}</h2>
      </div>
      <div className="right">
        <button>{footerData.buttonText}</button>
      </div>
    </div>
  </div>
)

export default FooterBaner