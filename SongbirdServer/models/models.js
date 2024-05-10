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
    avatarURL: { type: DataTypes.STRING, defaultValue: '#' },
    bonusAccount: { type: DataTypes.INTEGER, defaultValue: 0 },
})

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idUser: { type: DataTypes.INTEGER },
    list: { type: DataTypes.JSON, defaultValue: "[]" },
    adress: { type: DataTypes.JSON, },
    paymentMethod: { type: DataTypes.STRING, },
    paymentBonus: { type: DataTypes.INTEGER, defaultValue: 0 },
    typeDelivery: { type: DataTypes.STRING, },
    chargedBonuses: { type: DataTypes.INTEGER },
    priceGoods: { type: DataTypes.INTEGER },
    idStatus: { type: DataTypes.INTEGER, defaultValue: 1 },
    coordination: { type: DataTypes.BOOLEAN, },
    noPayment: { type: DataTypes.BOOLEAN, },

    //date: { type: DataTypes.STRING, },
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


const Delivery = sequelize.define('delivery', {
    courier: { type: DataTypes.BOOLEAN, defaultValue: false },
    pickup: { type: DataTypes.BOOLEAN, defaultValue: false },
})

const PaymentMethod = sequelize.define('payment-method', {
    cash: { type: DataTypes.BOOLEAN, defaultValue: false },
    card: { type: DataTypes.BOOLEAN, defaultValue: false },
})


const ConfirmeCode = sequelize.define('confirme-code', {
    userId: { type: DataTypes.INTEGER, },
    code: { type: DataTypes.INTEGER },
})


const Сategory = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, },
    route: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },

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


const SettingHome = sequelize.define('setting-home', {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    comment: { type: DataTypes.STRING },
    buttonNames: { type: DataTypes.STRING },
    background: { type: DataTypes.STRING },
})

const SettingBonuses = sequelize.define('bonuses', {
    list: { type: DataTypes.JSON },
})


//async function addColumn() {
//    const Order = sequelize.define('order', {
//        // ... существующие определения столбцов ...
//        coordination: {
//            type: DataTypes.BOOLEAN,
//        },
//    });

//    // Добавляем столбец "email" в существующую таблицу "users"
//    await Order.sync({ alter: true });
//}
//addColumn()

//await Сategory.sync({ alter: true });
//await Order.truncate();
//await Basket.truncate();
//await Favorites.truncate();
//await Goods.truncate();
//await Notifications.truncate();


Сategory.describe().then(data => {
    console.log('Сategory', data);
});
Order.describe().then(data => {
    console.log('Order', data);
});

Goods.describe().then(data => {
    console.log('Goods', data);
});

User.describe().then(data => {
    console.log('User', data);
});

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
    OrderStatus,
    Delivery,
    PaymentMethod,
    SettingHome,
    SettingBonuses
}