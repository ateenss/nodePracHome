


var indexFunc = (req, res, next) => {
    const env = process.env.NODE_ENV
    res.render('index', { title: 'Expressss'+env });
}

export {indexFunc};