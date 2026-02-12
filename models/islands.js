module.exports = (mongoose) => {
  const Island = mongoose.model(
    'islands',
    mongoose.Schema(
      {
        name: String,
        country: String,
        population: Number,
        language: String,
        capital: String,
        subRegion: String,
        climate: String,
        mainIndustries: [String],
        elevation: Number,
      },
      { timestamps: true }
    )
  );

  return Island;
};
