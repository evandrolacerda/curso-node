const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
    }
  })

const whitelist = ['image/png', 'image/jpg', 'image/jpeg']

const multerConfig = {
    storage : storage,
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            stringArquivosPermitidos = whitelist.join(', ')
            return cb(new Error('Tipo de Arquivo não permitido. Tipos permitidos: ' + stringArquivosPermitidos + '.'))
        }

        cb(null, true)
  }
}

const uploadHandler = multer( multerConfig ).single('avatar');

aplicativo.post('/uploads', middlewareAutenticacao, (req, res) => {
    
    uploadHandler( req, res, (err) => {
        
        if (err) {
            console.log( err );
            return res.status(400).json({ mensagem : "Erro ao fazer upload " + err.message });
        }

        const file = req.file;
    
    
        const data = req.body.data;

        console.log( data );

        res.send(file);
    });
       
});