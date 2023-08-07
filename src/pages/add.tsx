import {useForm} from 'react-hook-form'
import { useAddProductMutation } from '../services/product.services'
import { useNavigate } from 'react-router-dom'

type AddProductForm = {
    name: string,
    price: number,
    description: string,
}

const AddProduct = () => {
    const {handleSubmit, formState: {errors}, register} = useForm<AddProductForm>()
    const [addProduct] = useAddProductMutation()
    const navigate = useNavigate()
    const onSubmit = (data: AddProductForm) => {
        addProduct(data)
        navigate("/")
    }

    return <section className="relative flex flex-wrap lg:h-screen lg:items-center">
    <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Thêm mới sản phẩm</h1>
      </div>
  
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label className="sr-only">Name</label>
  
          <div className="relative">
            <input
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter name"
              {...register("name")}
            />
  
          </div>
        </div>
  
        <div>
          <label className="sr-only">Price</label>
  
          <div className="relative">
            <input
              type="number"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter price"
              {...register("price")}

            />
  
  
          </div>
        </div>
        <div>
          <label className="sr-only">Description</label>
  
          <div className="relative">
            <textarea
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter description"
              {...register("description")}

            />
  
  
          </div>
        </div>
  
        <div className="flex items-center justify-between">
  
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Thêm mới
          </button>
        </div>
      </form>
    </div>
  </section>
}

export default AddProduct