const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('sessions', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            token: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            }
        }, {
            timestamps: true
        })
        
        await queryInterface.addColumn('users', 'disabled', {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('sessions')
        await queryInterface.removeColumn('users', 'disabled')
    }
}