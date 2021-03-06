<tf-career>
  <div class="tf-career-container" if={this.visible}>
    <div class="tf-career-inner">
      <div class="tf-career-body">
        <img src="{this.career.picture}" class="tf-image">
        <div class="tf-details">
          <div class="tf-title">{this.career.title}</div>
          <div class="tf-score">
            <span class="tf-percent">{Math.round(this.score)}%</span>
            <span class="undefined">match</span>
          </div>
          <div class="tf-description">{this.career.description}</div>
        </div>
        <div class="tf-stats">
          <div class="tf-mean tf-stat">
            <div class="tf-stat-title">Salary Mean:</div>
              <div class="tf-stat-data">
                ${this.career.salary_projection.annual_salary_mean}
              </div>
            </div>
          <div class="tf-future tf-stat">
            <div class="tf-stat-title">Bright Future:</div>
            <div class="tf-stat-data">
              <span if={this.career.bright_outlooks}>
                <img src="https://cdn.traitify.com/assets/images/career-details/sun.png" alt="Sun">
              </span>
              <span if={!this.career.bright_outlooks}>
                <img src="https://cdn.traitify.com/assets/images/career-details/block.png" alt="Block">
              </span>
            </div>
          </div>
          <div class="tf-median tf-stat">
            <div class="tf-stat-title">Salary Median:</div>
            <div class="tf-stat-data">
              ${this.career.salary_projection.annual_salary_median}
            </div>
          </div>
          <div class="tf-green tf-stat">
            <div class="tf-stat-title">Green Career:</div>
            <div class="tf-stat-data">
              <span if={this.career.green_categories}>
                <img src="https://cdn.traitify.com/assets/images/career-details/green.png" alt="Green">
              </span>
              <span if={!this.career.green_categories}>
                <img src="https://cdn.traitify.com/assets/images/career-details/block.png" alt="Block">
              </span>
            </div>
          </div>
          <div class="tf-growth tf-stat">
            <div class="tf-stat-title">Job Growth:</div>
            <div class="tf-stat-data">{this.career.employment_projection.percent_growth_2022}%</div>
          </div>
          <div class="tf-onet tf-stat">
            <div class="tf-stat-title">O'Net Link:</div>
            <div class="tf-stat-data">
              <a href="http://www.onetonline.org/link/summary/{this.career.id}" target="_blank">{this.career.id}</a>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="tf-experience">
          <div class="tf-experience-header">
            <span class="tf-experience-header-text">Experience Level</span>
            <div class="tf-experience-boxes">
              <div class="tf-experience-box  { this.career.experience_level.id > 0 ? 'tf-highlighted-box' : ''}"></div>
              <div class="tf-experience-box  { this.career.experience_level.id > 1 ? 'tf-highlighted-box' : ''}"></div>
              <div class="tf-experience-box  { this.career.experience_level.id > 2 ? 'tf-highlighted-box' : ''}"></div>
              <div class="tf-experience-box  { this.career.experience_level.id > 3 ? 'tf-highlighted-box' : ''}"></div>
              <div class="tf-experience-box  { this.career.experience_level.id > 4 ? 'tf-highlighted-box' : ''}"></div>

            </div>
          </div>
        <div class="tf-experience-body">
          {this.career.experience_level.experience}
        </div>
      </div>
      <div class="tf-education">
        <div class="tf-education-header">
          <span class="tf-education-header-text">Education</span>
        </div>
        <div class="tf-education-body">
          <div class="tf-education-title">{this.career.experience_level.degree}</div>
          <div class="tf-education-description">{this.career.experience_level.education}</div>
        </div>
      </div>
      <div class="tf-majors">
        <div class="tf-majors-header">
          <span class="tf-majors-header-text">Majors</span>
        </div>
        <div class="tf-majors-body">
          <div class="tf-major" each={this.career.majors}>
            <div class="tf-major-title">{this.title}</div>
            <div class="tf-major-description">{this.description}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <style type="text/myparser">
    .tf-career-container{
      font-family: "Source Sans Pro", Arial, Verdana, sans-serif;
      font-size: 18px;
      line-height: 1.5;
      margin: 20px;
    }
    .tf-career-container .tf-invisible{
      visibility: hidden;
    }
    .tf-career-container.ie{
      font-family: arial;
    }
    .tf-career-container a{
      color: black;
      text-decoration: underline;
    }
    .tf-career-container div, .tf-career-container img{
      box-sizing: content-box;
    }
    .tf-career-container .tf-career-inner{
      max-width: 800px;
      margin: 0 auto;
    }
    .tf-popout-open {
      overflow: hidden;
    }
    .tf-popout-open body {
      overflow: hidden;
    }
    .tf-popout-career {
      position: fixed;
      overflow-y: scroll;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0);
      background-color: rgba(0,0,0,0.5);
    }
    .tf-popout-career .tf-career-inner {
      background-color: white;
    }

    .tf-career-container .tf-header-inner{
      color: white;
      padding: 10px 25px;
      background-color: #058fc4;
    }
    .tf-career-container .tf-header-close{
      float: right;
      cursor: pointer;
    }
    .tf-career-container .tf-career-body{
      padding: 20px;
    }
    .tf-career-container .tf-image{
      width: 25%;
      display: inline-block;
    }
    .tf-career-container .tf-details{
      position: relative;
      width: 70%;
      padding: 0 20px;
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
    }
    @media (max-width: 768px) {
      .tf-career-container .tf-details{
        margin-top: 10px;
      }
    }
    .tf-career-container .tf-details .tf-title{
      font-weight: bold;
      display: inline-block;
      padding-right: 50px;
    }
    .tf-career-container .tf-details .tf-score{
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px;
      margin-top: -13px;
      text-align: center;
      font-size: 12px;
      line-height: 1;
      font-weight: bold;
    }
    .tf-career-container .tf-details .tf-score .tf-percent{
      font-size: 18px;
    }
    .tf-career-container .tf-details .tf-score span{
      display: block;
    }
    .tf-career-container .tf-stats,
    .tf-career-container .tf-experience,
    .tf-career-container .tf-education,
    .tf-career-container .tf-majors{
      margin: 20px 0;
    }
    .tf-career-container .tf-majors{
      margin-bottom: 0;
    }
    .tf-career-container .tf-stats .tf-stat {
      width: 50%;
      display: inline-block;
      float:left;
      box-sizing: border-box;
      margin-top: 10px;
    }
    @media (max-width: 768px) {
      .tf-career-container .tf-stats .tf-stat {
        width: 100%;
      }
    }
    .tf-career-container .tf-stats .tf-stat-title {
      width: 40%;
      float: left;
      text-align: right;
      font-weight: bold;
      box-sizing: border-box;
    }
    .tf-career-container .tf-stats .tf-stat-data {
      width: 60%;
      float: left;
      text-align: right;
      display: inline-block;
      box-sizing: border-box;
    }
    .tf-career-container .tf-stats .tf-stat-data-header,
    .tf-career-container .tf-stats .tf-stat-data-body {
      width: 50%;
      float: left;
      text-align: center;
    }
    .tf-career-container .tf-stats .tf-stat-data-body {
      text-align: right;
    }
    .tf-career-container .tf-stats .tf-stat-data-mean,
    .tf-career-container .tf-stats .tf-stat-data-median {
      width: 50%;
      display: inline-block;
    }
    .tf-career-container .tf-stats img {
      width: 23px;
    }
    .tf-career-container .tf-stats,
    .tf-career-container .tf-experience-header,
    .tf-career-container .tf-education-header,
    .tf-career-container .tf-majors-header{
      padding: 10px 20px;
    }
    .tf-career-container .tf-experience-body,
    .tf-career-container .tf-education-body,
    .tf-career-container .tf-majors-body{
      padding: 10px 20px;
    }
    .tf-career-container .tf-experience-boxes{
      padding: 0 10px;
      display: inline-block;
    }
    .tf-career-container .tf-experience-box{
      width: 10px;
      height: 10px;
      margin-right: 2px;
      display: inline-block;
      background-color: #e2e2e2
    }
    .tf-career-container .tf-experience-box.tf-highlighted-box{
      background-color: #058fc4;
    }
    .tf-career-container .tf-education-title,
    .tf-career-container .tf-major-title{
      font-weight: bold;
    }
    .tf-career-container .tf-major-description{
      padding-bottom: 10px;
    }
    .clearfix{
      clear:both;
    }
    @media (max-width: 768px) {
      .tf-career-container .tf-image,
      .tf-career-container .tf-details{
        width: 100%;
        padding: 0;
      }
    }
  </style>
  <script>
    that = this
    @setCareer = (career)->
      @visible = true
      @career = career.career
      @career.salary_projection.annual_salary_mean = @career.salary_projection.annual_salary_mean.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      @career.salary_projection.annual_salary_median = @career.salary_projection.annual_salary_median.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      @score = career.score
      @update()

    if opts.career
      @setCareer(opts.career)
    else
      Traitify.getCareers(@assessmentId).then((careers)->
        career = careers.filter((career)->
          career.career.id == that.careerId
        )[0]
        that.setCareer(career)
      )
  </script>
</tf-career>
