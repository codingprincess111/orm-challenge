const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'not found' });
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category) {
      res.status(404).json({ message: 'not found' });
      return;
    }

    res.status(200).json(category);

  } catch (err) {
    res.status(500).json({ message: 'not found' });
  }
  
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'not created' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updated = await Category.update(req.body, { where: { id: req.params.id } });

    !updated[0] ? res.status(404).json({ message: 'not found' }) : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });

    !deleted ? res.status(404).json({ message: 'not found' }) : res.status(200).json({ message: 'deleted' });
  } catch (err) {
    res.status(500).json({ message: 'delete failed' });
  }
});

module.exports = router;
