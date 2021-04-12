import React, { useEffect, useState } from "react";
import fileDownload from "js-file-download";
import MainLayout from "../core/layout/MainLayout";
import { IBooking } from "../core/utils/stepts";
import moment from 'moment'

const bookings = () => {
  const [bookingsStored, setBookingsStored] = useState<IBooking[]>([]);

  useEffect(() => {
    const bookingLocalStorage: IBooking[] = JSON.parse(localStorage.getItem("bookings"));
    setBookingsStored(bookingLocalStorage || []);
  }, []);

  return (
    <MainLayout>
      <div className="p-5 bg-white">
        <h2 className="mb-8 text-2xl font-semibold text-center text-purple-600">Reservar</h2>
        <div className="flex flex-col mb-5">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        ID
                      </th>
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
                        Reservado el
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Cantidad de persona
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Reserva para
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookingsStored && bookingsStored.length ? (
                      bookingsStored.map((booking, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <strong>{booking.id}</strong>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  <strong>{booking.name}</strong>
                                </div>
                                <div className="text-sm text-gray-500">{booking.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              <strong>{moment(booking.createdAt).startOf('minutes').locale("es-do").fromNow()}</strong>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <strong>{booking.amountPeople}</strong>
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            <strong>
                              {booking.time} - {booking.date}
                            </strong>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4}>
                          <p></p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="px-3 py-2 text-white duration-150 bg-purple-500 border border-purple-500 hover:bg-purple-600"
            onClick={() => {
              fileDownload(localStorage.getItem("bookings"), "bookings.json");
            }}
          >
            Exportar data
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default bookings;
