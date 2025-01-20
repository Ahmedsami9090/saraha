export const validateInput = (schema, locations) => {
  return (req, res, next) => {
    let errorBox = [];
    const x = new Set(locations)
    for (const location of x) {
      for(const key of Object.keys(schema)) {
        if (location === key) {
          const { error } = schema[key].validate(req[location], { abortEarly: false });
          error ? errorBox.push(error) : ''
        }
      };
    };
    if(errorBox.length){
        return next(new Error(errorBox, {cause : 406}))
    }
    next()
  };
};
