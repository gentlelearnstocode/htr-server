class APIFeatures {
    constructor(query, queryObj){
      this.query = query
      this.queryObj = queryObj
    }
    filter(){
      const queryObj = this.queryObj
      let queryObjStr = JSON.stringify(queryObj)
      queryObjStr = queryObjStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>{
        return `$${match}`
      })
      this.query = this.query.find(JSON.parse(queryObjStr))
      return this
    }
    sort(){
      if(this.queryObj.sort){
        const sortBy = this.queryObj.sort.split(',').join(' ')
        console.log(sortBy);
        this.query = this.query.sort(sortBy)
      }else{
        this.query = this.query.sort('-createdOn')
      }
      return this
    }
    limitFields(){
      if(this.queryObj.fields){
        const fields = this.queryObj.fields.split(',').join(' ')
        this.query = this.query.select(fields)
      }else{
        this.query = this.query.select('-__v')
      }
      return this
    }
    paginate(){
      const page = this.queryObj.page || 1
      const limit = this.queryObj.limit || 10
      const skip = (page -1) * limit
      this.query = this.query.skip(skip).limit(limit)
      return this
    }
  }

module.exports = APIFeatures

//before refactoring into class
  //filtering
    // const queryObj = req.query
    // let queryObjStr = JSON.stringify(queryObj)
    // queryObjStr = queryObjStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>{
    //   return `$${match}`
    // })
    // let query = Road.find(JSON.parse(queryObjStr))

    //sorting
    // if(req.query.sort){
    //   const sortBy = req.query.sort.split(',').join(' ')
    //   console.log(sortBy);
    //   query = query.sort(sortBy)
    // }else{
    //   query = query.sort('-createdOn')
    // }

    //limit fields
    // if(req.query.fields){
    //   const fields = req.query.fields.split(',').join(' ')
    //   query = query.select(fields)
    // }else{
    //   query = query.select('-__v')
    // }
    // paginating
    // const page = req.query.page || 1
    // const limit = req.query.limit || 10
    // const skip = (page -1) * limit
    // query = query.skip(skip).limit(limit)