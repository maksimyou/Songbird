import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

const Goods = sequelize.define('goods', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT },
    quantity: { type: DataTypes.BOOLEAN },
    composition: { type: DataTypes.TEXT },
    liked: { type: DataTypes.INTEGER, defaultValue: 0 },
    bought: { type: DataTypes.INTEGER, defaultValue: 0 },
    imageURL: { type: DataTypes.JSON, defaultValue: "[]" }
})

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, defaultValue: '' },
    birthday: { type: DataTypes.STRING, defaultValue: '' },
    adress: { type: DataTypes.JSON, defaultValue: "[]" },
    name: { type: DataTypes.STRING, },
    confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
    avatarURL: { type: DataTypes.STRING, defaultValue: '#' }
})

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idUser: { type: DataTypes.INTEGER },
    list: { type: DataTypes.JSON, defaultValue: "[]" },
    idStatus: { type: DataTypes.INTEGER, defaultValue: 1 },
})

const OrderStatus = sequelize.define('order-status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    statusText: { type: DataTypes.STRING, },
})


const Notifications = sequelize.define('notifications', {
    userId: { type: DataTypes.INTEGER, },
    sms: { type: DataTypes.BOOLEAN },
    email: { type: DataTypes.BOOLEAN },
})


const ConfirmeCode = sequelize.define('confirme-code', {
    userId: { type: DataTypes.INTEGER, },
    code: { type: DataTypes.INTEGER },
})


const Сategory = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, },
    route: { type: DataTypes.STRING },
})


const Favorites = sequelize.define('favorites', {
    idUser: { type: DataTypes.INTEGER },
    lists: { type: DataTypes.JSON, },
})


const Basket = sequelize.define('basket', {
    idUser: { type: DataTypes.INTEGER },
    lists: { type: DataTypes.JSON, },
})


const SettingSite = sequelize.define('setting-site', {
    phone: { type: DataTypes.STRING, },
    address: { type: DataTypes.STRING, },
    email: { type: DataTypes.STRING, },
    instagram: { type: DataTypes.STRING, },
    youtube: { type: DataTypes.STRING, },
    telegram: { type: DataTypes.STRING, },
    vkontakte: { type: DataTypes.STRING, },
})


//const Booking = sequelize.define('booking', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    order: { type: DataTypes.BOOLEAN, allowNull: false },
//    dateOrder: { type: DataTypes.STRING },
//    customerId: { type: DataTypes.INTEGER },
//    customerFirstName: { type: DataTypes.STRING },
//    customerLastName: { type: DataTypes.STRING },
//})

//const Commentt = sequelize.define('commentt', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    rating: { type: DataTypes.INTEGER, allowNull: false },
//    text: { type: DataTypes.STRING },
//    createdAt: { type: DataTypes.STRING, allowNull: false },
//    user: { type: DataTypes.ARRAY(DataTypes.JSON) },
//})

//const UserComment = sequelize.define('usercomment', {
//    commentUserId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    firstName: { type: DataTypes.STRING, allowNull: false },
//    lastName: { type: DataTypes.STRING, allowNull: false },
//    avatarUrl: { type: DataTypes.STRING },
//})

//const Delivery = sequelize.define('delivery', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    handed: { type: DataTypes.BOOLEAN, allowNull: false },
//    dateHandedFrom: { type: DataTypes.STRING },
//    dateHandedTo: { type: DataTypes.INTEGER },
//    recipientId: { type: DataTypes.INTEGER },
//    recipientFirstName: { type: DataTypes.STRING },
//    recipientLastName: { type: DataTypes.STRING },
//})

//const Image = sequelize.define('booking', {
//    url: { type: DataTypes.STRING },
//})

//const Historiees = sequelize.define('historiees', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    userId: { type: DataTypes.INTEGER, primaryKey: true, },
//})

//const Book = sequelize.define('book', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    title: { type: DataTypes.STRING },
//    rating: { type: DataTypes.FLOAT, allowNull: false },
//    issueYear: { type: DataTypes.STRING, allowNull: false },
//    description: { type: DataTypes.TEXT },
//    publish: { type: DataTypes.STRING },
//    pages: { type: DataTypes.STRING },
//    cover: { type: DataTypes.STRING },
//    weight: { type: DataTypes.STRING },
//    format: { type: DataTypes.STRING },
//    ISBN: { type: DataTypes.STRING },
//    producer: { type: DataTypes.STRING },
//    authors: { type: DataTypes.ARRAY(DataTypes.STRING) },
//    images: { type: DataTypes.ARRAY(DataTypes.JSON) },
//    categories: { type: DataTypes.ARRAY(DataTypes.STRING) },
//    //comments: { type: DataTypes.ARRAY(DataTypes.JSON) },
//    booking: { type: DataTypes.JSON },
//    delivery: { type: DataTypes.JSON },
//    histories: { type: DataTypes.ARRAY(DataTypes.JSON) },
//})

//const BookCatalog = sequelize.define('BookCatalog', {
//    type: DataTypes.ARRAY(DataTypes.JSON)
//})
//const Categorie = sequelize.define('categorie', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    name: { type: DataTypes.STRING, allowNull: false },
//    path: { type: DataTypes.STRING, allowNull: false },
//})

//const Categories = sequelize.define('categories', {
//    type: DataTypes.ARRAY(DataTypes.JSON)
//})

//BookCatalog.hasMany(Book)
//Book.belongsTo(BookCatalog)

//Categories.hasMany(Categorie)
//Categorie.belongsTo(Categories)

//Book.hasMany(Booking)
//Booking.belongsTo(Book)

//Book.hasMany(Delivery)
//Delivery.belongsTo(Book)

//Book.hasMany(Historiees)
//Historiees.belongsTo(Book)

//Book.hasMany(Commentt)
//Commentt.belongsTo(Book)

//Commentt.hasOne(UserComment)
//UserComment.belongsTo(Commentt)

//module.exports = {
//    User, Booking, Comment, UserCommen, Delivery, Historie, Book, Books, Categories, Categorie
//}

export default {
    User,
    Goods,
    Сategory,
    SettingSite,
    ConfirmeCode,
    Favorites,
    Notifications,
    Basket,
    Order,
    OrderStatus
}