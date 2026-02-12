module.exports = (mongoose) => {
  const Tradition = mongoose.model(
    'traditions',
    mongoose.Schema(
      {
        name: String,
        islandId: Number,
        description: String,
        category: String,
        significance: String,
      },
      { timestamps: true }
    )
  );

  return Tradition;
};
