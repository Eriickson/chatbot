import React, { useEffect, useState } from "react";
import { IStepItem } from "../components";
import isNumber from "is-number";
import categories from "./categories.json";
import { IMenuItem } from "../../pages/add-saucer";
import moment from "moment";
import { nanoid } from "nanoid";

export interface IBooking {
  id: string;
  amountPeople: number;
  name: string;
  email: string;
  date: string;
  time: string;
  createdAt: string;
}

export const useSteps = () => {
  const [amountPeople, setAmountPeople] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [id, setId] = useState(nanoid(6));
  const [placeOrders, setPlaceOrders] = useState<string[]>([]);

  async function createNewBooking(newBooking: IBooking) {
    console.log({ amountPeople, name, email, date, time });

    const bookingLocalStorage: IBooking[] = JSON.parse(localStorage.getItem("bookings"));
    let newBookings: IBooking[];

    console.log(newBooking);

    newBookings = !bookingLocalStorage ? [newBooking] : [...bookingLocalStorage, newBooking];

    localStorage.setItem("bookings", JSON.stringify(newBookings));
    setId(nanoid(6));
  }

  const stepsWelcome: IStepItem[] = [
    {
      id: "welcome-0",
      message: "Hola, Bienvenido a Erickson Restaurant",
      trigger: "welcome-1",
    },
    {
      id: "welcome-1",
      message: "En que podemos ayudarte?",
      trigger: "welcome-2",
    },
    {
      id: "welcome-2",
      options: [
        { value: 1, label: "Reservar una mesa", trigger: "reserve-1" },
        { value: 2, label: "Hacer un pedido", trigger: "place-orders-1" },
        { value: 3, label: "Consultar el menú", trigger: "consult-1" },
        { value: 4, label: "Cancelar una reserva", trigger: "cancel-reserve-1" },
      ],
    },
  ];

  const stepsReserve: IStepItem[] = [
    {
      id: "reserve-1",
      message: "Cantidad de personas",
      trigger: "reserve-2",
    },
    {
      id: "reserve-2",
      user: true,
      validator: (value) => {
        if (!isNumber(value)) return "Cantidad de personas no válida";
        if (Number(value) > 8) return "Máximo 8 personas";
        setAmountPeople(Number(value));
        return true;
      },
      trigger: "reserve-3",
    },
    {
      id: "reserve-3",
      message: "Para que fecha quiere hacer su reserva? (dd/mm/yy)",
      trigger: "reserve-4",
    },
    {
      id: "reserve-4",
      user: true,
      validator: (date) => {
        setDate(date);
        return true;
      },
      trigger: "reserve-5",
    },
    {
      id: "reserve-5",
      message: "A que hora? (hh:mm 'formato 24hrs')",
      trigger: "reserve-6",
    },
    {
      id: "reserve-6",
      user: true,
      validator: (time) => {
        setTime(time);
        return true;
      },
      trigger: "reserve-7",
    },
    {
      id: "reserve-7",
      message: "Digita tu nombre?",
      trigger: "reserve-8",
    },
    {
      id: "reserve-8",
      user: true,
      validator: (name) => {
        setName(name);
        return true;
      },
      trigger: "reserve-9",
    },
    {
      id: "reserve-9",
      message: "Ingresa tu correo electrónico",
      trigger: "reserve-10",
    },
    {
      id: "reserve-10",
      user: true,
      validator: (email) => {
        setEmail(email);
        return true;
      },
      trigger: "reserve-11",
    },
    {
      id: "reserve-11",
      message: `Su reserva se ha hecho exitosamente, es id de su reserva es: ${id}`,
      trigger: "welcome-1",
    },
  ];

  const stepsCancelReserve: IStepItem[] = [
    {
      id: "cancel-reserve-1",
      message: "Ingresa id de la reserva que quieres cancelar o 0 para cancelar la acción",
      trigger: "cancel-reserve-2",
    },
    {
      id: "cancel-reserve-2",
      user: true,
      validator: (value) => {
        const bookingsLocalStored: IBooking[] = JSON.parse(localStorage.getItem("bookings"));

        const bookingToCancel = bookingsLocalStored.filter((booking) => booking.id === value);
        if (!bookingToCancel.length) return "Este ID no está asignado a ninguna reserva";
        const createdAt = moment(bookingToCancel[0].createdAt);
        const now = moment(moment().format());
        const diff = now.diff(createdAt, "minutes");

        if (diff > 240) return "Esta reserva tiene más de 4 horas.";
        console.log({ diff, createdAt, now });

        const newBookings = bookingsLocalStored.filter((booking) => booking.id !== value);
        localStorage.setItem("bookings", JSON.stringify(newBookings));

        return true;
      },
      trigger: "cancel-reserve-3",
    },
    {
      id: "cancel-reserve-3",
      message: "Se ha cancelado la reserva",
      trigger: "welcome-1",
    },
    // {
    //   id: "cancel-reserve-3",
    //   message: "Ingresa id de la reserva que quieres cancelar",
    //   trigger: "cancel-reserve-2",
    // },
    // {
    //   id: "cancel-reserve-4",
    //   message: "Ingresa id de la reserva que quieres cancelar",
    //   trigger: "cancel-reserve-2",
    // },
  ];

  const stepsConsult: IStepItem[] = [
    {
      id: "consult-1",
      message: "Aquí está la lista completa de nuestro menú",
      trigger: "consult-2",
    },
    {
      id: "consult-2",
      component: (
        <div>
          <ul className="divide-y">
            {categories.map((category, i) => {
              const menu: IMenuItem[] =
                typeof window !== "undefined" ? JSON.parse(localStorage.getItem("menu")) : [];
              const itemsMenu = menu.filter((item) => item.category === String(category.id));

              return (
                <li className="py-3" key={i}>
                  <b className="mb-2">{category.name}</b>
                  <ul>
                    {itemsMenu.map((item) => (
                      <li>
                        {item.name} - <strong className="text-green-600">RD$ {item.price}</strong>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      ),
      trigger: "welcome-2",
    },
  ];

  const stepsPlacOorders: IStepItem[] = [
    {
      id: "place-orders-1",
      message: "Aquí está el menú, que desea ordernar?",
      trigger: "place-orders-2",
    },
    {
      id: "place-orders-2",
      component: (
        <div>
          <ul className="divide-y">
            {categories.map((category, i) => {
              const menu: IMenuItem[] =
                typeof window !== "undefined" ? JSON.parse(localStorage.getItem("menu")) : [];
              const itemsMenu = menu.filter((item) => item.category === String(category.id));

              return (
                <li className="py-3" key={i}>
                  <b className="mb-2">{category.name}</b>
                  <ul>
                    {itemsMenu.map((item) => (
                      <li>
                        <b className="text-purple-500">{item.id}</b> - {item.name} -{" "}
                        <strong className="text-green-600">RD$ {item.price}</strong>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      ),
      trigger: "place-orders-3",
    },
    {
      id: "place-orders-3",
      message: "Ingrese los id's de lo que quiere ordenar, separado por coma",
      trigger: "place-orders-4",
    },
    {
      id: "place-orders-4",
      user: true,
      validator: (value) => {
        const placeOrdersId = value.split(",").map((item) => item.trim());
        setPlaceOrders(placeOrdersId);
        return true;
      },
      trigger: "place-orders-5",
    },
    {
      id: "place-orders-5",
      message: "Su pedido se ha realizado exitosamente",
      trigger: "welcome-1",
    },
  ];

  const steps = [
    ...stepsWelcome,
    ...stepsReserve,
    ...stepsConsult,
    ...stepsCancelReserve,
    ...stepsPlacOorders,
  ];

  useEffect(() => {
    if (email.length)
      createNewBooking({
        id,
        amountPeople,
        name,
        email,
        date,
        time,
        createdAt: moment().format(),
      });
  }, [email]);

  return { steps };
};
