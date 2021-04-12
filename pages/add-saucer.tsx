import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import fileDownload from "js-file-download";
import MainLayout from "../core/layout/MainLayout";
import { useForm } from "react-hook-form";
import categories from "../core/utils/categories.json";

export interface IMenuItem {
  id: string;
  name: string;
  price: string;
  category: string;
}

const AddSaucer = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [menuList, setMenuList] = useState<IMenuItem[]>([]);

  async function onSubmit({ name, price, category }: IMenuItem) {
    let menu: IMenuItem[] = JSON.parse(localStorage.getItem("menu"));

    const newItemMenu: IMenuItem = { id: nanoid(5), name, price, category };

    menu = !menu ? [newItemMenu] : [...menu, newItemMenu];

    localStorage.setItem("menu", JSON.stringify(menu));
    setMenuList(menu);
    setValue("name", null);
    setValue("price", null);
    setValue("category", "");
    document.getElementById("name").focus();
  }

  useEffect(() => {
    const menu: IMenuItem[] = JSON.parse(localStorage.getItem("menu"));
    setMenuList(menu);
  }, []);

  return (
    <MainLayout>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-5">
          <div className="p-5 bg-white md:max-w-md">
            <h2 className="mb-3 text-3xl font-semibold text-center text-purple-600">
              Agregar item
            </h2>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <input
                id="name"
                type="text"
                className="border mb-5 border-purple-600 bg-purple-100 px-3.5 py-2 focus:bg-purple-200 duration-150 focus:ring-2 focus:ring-purple-300 w-full max-w-md placeholder-purple-300"
                placeholder="Nombre"
                {...register("name", { required: true })}
              />
              <input
                type="text"
                className="border mb-5 border-purple-600 bg-purple-100 px-3.5 py-2 focus:bg-purple-200 duration-150 focus:ring-2 focus:ring-purple-300 w-full max-w-md placeholder-purple-300"
                placeholder="Precio"
                {...register("price", { required: true })}
              />
              <select
                className="border mb-5 border-purple-600 bg-purple-100 px-3.5 pt-2 pb-2.5 focus:bg-purple-200 duration-150 focus:ring-2 focus:ring-purple-300 w-full max-w-md"
                placeholder="Precio"
                {...register("category", { required: true })}
              >
                <option value="">Selecciona una Categoría</option>
                {categories.map((category) => (
                  <option value={category.id}>{category.name}</option>
                ))}
              </select>
              <button className="btn w-full bg-purple-500 p-2.5 text-white font-medium cursor-pointer hover:opacity-80 duration-150">
                Agregar item
              </button>
            </form>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7">
          <div className="p-5 bg-white">
            <h2 className="mb-3 text-3xl font-semibold text-center text-purple-600">
              Menú disponible
            </h2>
            <div className="flex flex-col">
              <div className="mb-3 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-gray-200 shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Nombre
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Precio
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Categoría
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {menuList && menuList.length ? (
                          menuList.map((item, i) => (
                            <tr key={i}>
                              <td className="px-6 py-4 font-semibold text-purple-600 whitespace-nowrap">
                                {item.name}
                              </td>
                              <td className="px-6 py-4 font-semibold text-purple-600 whitespace-nowrap">
                                RD$ {item.price}
                              </td>
                              <td className="px-6 py-4 font-semibold text-purple-600 whitespace-nowrap">
                                {
                                  categories.filter(
                                    (category) => parseInt(item.category) == category.id,
                                  )[0].name
                                }
                              </td>
                              <td className="px-6 py-4 font-semibold text-purple-600 whitespace-nowrap">
                                <button
                                  className="font-semibold text-red-500"
                                  onClick={() => {
                                    let menu: IMenuItem[] = JSON.parse(
                                      localStorage.getItem("menu"),
                                    );
                                    menu = menu.filter((menuItem) => item.id !== menuItem.id);
                                    localStorage.setItem("menu", JSON.stringify(menu));

                                    setMenuList(menu);
                                  }}
                                >
                                  x
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3}>
                              <p className="w-full py-2 text-lg font-semibold text-center text-gray-400">
                                No hay platos agregados
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-3 py-2 text-white duration-150 bg-purple-500 border border-purple-500 hover:bg-purple-600"
                  onClick={() => {
                    fileDownload(localStorage.getItem("menu"), "menu.json");
                  }}
                >
                  Exportar data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddSaucer;
