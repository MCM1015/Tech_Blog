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

//Get Post when logged in
router.get('/login/post/:id', async (req, res) => {
    
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment, include: [
                        {
                            model: User,
                            attributes: ['name'],
                        },
                    ],
                },
            ]
        });

        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });

        const posts = postData.get({ plain: true });
        const user = userData.get({ plain: true })

        res.render('loginPost', {
            posts,
            user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get Post when not logged in
router.get('/post/:id', async (req, res) => {
    
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment, include: [
                        {
                            model: User,
                            attributes: ['name'],
                        },
                    ],
                },
            ]
        });


        const posts = postData.get({ plain: true });

        res.render('post', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['name'],
            }],
            where: {
                user_id: req.session.user_id
            }
        });

        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        const user = userData.get({ plain: true })
        console.log(posts);

        res.render('dashboard', {
            posts,
            user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
