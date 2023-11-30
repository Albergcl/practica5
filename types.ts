export type Client = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    DNI: string,
    bookings: Array<Omit<Booking, "client">>
}

export type Restaurant = {
    name: string,
    CIF: string,
    address: string,
    bookings: Array<Omit<Booking, "restaurant">>
}

export type Booking = {
    date?: Date,
    client: string,
    restaurant: string
}