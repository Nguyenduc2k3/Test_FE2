import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProductMutation } from '../services/product.services';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '../models';


type UpdateProductForm = {
  name: string;
  price: number;
  description: string;
};

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { handleSubmit, formState: { errors }, register, setValue, getValues } = useForm<UpdateProductForm>();
  const [updateProduct] = useUpdateProductMutation(); 
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const productData: IProduct = await response.json();
        // Set the form values with fetched product data
        setValue('name', productData.name);
        setValue('price', productData.price);
        setValue('description', productData.description);
      } else {
        console.error('Error fetching product details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id, setValue]);

  const onSubmit = async (data: UpdateProductForm) => {
    await updateProduct({ id: Number(id), ...data });
    navigate('/');
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Edit sản phẩm</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              type="text"
              id="name"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter name"
              {...register('name')}
            />
          </div>

          <div>
            <label htmlFor="price" className="sr-only">Price</label>
            <input
              type="number"
              id="price"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter price"
              {...register('price')}
            />
          </div>

          <div>
            <label htmlFor="description" className="sr-only">Description</label>
            <textarea
              id="description"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter description"
              {...register('description')}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UpdateProduct;
