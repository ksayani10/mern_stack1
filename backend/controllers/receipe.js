const Receipes=require("../models/receipe")

const getReceipes =async(req ,res) => 
{
    const receipes =await Receipes.find()

    return res.json(receipes)
}
const getReceipe =async(req ,res) => 
{
   const receipe = await Receipes.findById(req.params.id)

   res.json(receipe)
}
const addReceipe =async(req ,res) => 
{
    const{title,ingredients,instructions ,time} =req.body

    if(!title  || !ingredients || !instructions)
    {
        res.json({message :"Required fields can't be empty"})
    }

    const newReceipe =await Receipes.create(
        {
            title,ingredients,instructions ,time
        }
    )

    return res.json(newReceipe)
}

const editReceipe =async(req ,res) => 
{
    const{title,ingredients,instructions ,time} =req.body

    let receipe =await Receipes.findById(req.params.id)

    try{

          if(receipe)
    {
        await Receipes.findByIdAndUpdate(req.params.id,req.body,{new:true})

         res.json ({title,ingredients,instructions ,time})
    }
 }
    catch(err){
        return res.status(404).json({message:"error"})
    }
    

  
}
const deleteReceipe =(req ,res) => 
{
    res.json ({message :"Here your receipes"})
}

module.exports={getReceipes ,getReceipe ,addReceipe,editReceipe,deleteReceipe}