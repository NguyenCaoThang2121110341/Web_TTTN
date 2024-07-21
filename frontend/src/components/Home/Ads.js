import React from 'react'

function Ads() {
  return (
 <>
    <div class="box-add-products">
		<div class="container">
			<div class="row">
				<div class="col-lg-6 col-md-6 col-sm-12">
					<div class="offer-box-products">
						<img class="img-fluid"  width={600} src={require("../../asset/images/banner1.jpg")} alt="" />
					</div>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12">
					<div class="offer-box-products">
						<img class="img-fluid" width={500} src={require("../../asset/images/banner3.jpg")} alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
  </>
  )
}

export default Ads







