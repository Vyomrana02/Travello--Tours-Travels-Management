import Subscribers from '../models/Subscribers.js'

export const addSubscriers = async (req, res) => {

   try {
        const newSub = new Subscribers(req.body)
        const savedSub = await newSub.save()

      res.status(200).json({ success: true, message: 'Successfully Add' ,data: savedSub})
   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Failed to Add' })
   }
}
