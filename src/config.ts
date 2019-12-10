import * as convict from 'convict';

const config = convict({
    bcryptSaltRounds: {
        format: '*',
        default: 10
    },
    jwtSecretKey:{
        format: '*',
        default: 'nodeRestApi'
    }
});

export {config};