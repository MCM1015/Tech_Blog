const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth')

// Get Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/homepage');
        return;
    }

    res.render('login');
})

// Get Homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                { model: Comment },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                { model: Comment }
            ],
        });

        const posts = postData.get({ plain: true });
        console.log(posts);

        res.render('post', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: Comment }],
            where: {
                user_id: req.session.user_id
            }
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);

        res.render('dashboard', {
            posts,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
