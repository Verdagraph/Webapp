"""Crop-level facts read by hand from West Coast Seeds' growing text, keyed by group id (see mkgroups.py).
Lengths are cm, times are days. Midpoints are used where the text gives a range.
`basisAssumed` marks groups whose page does not say what days-to-maturity counts from."""
E = {}
def crop(gid, name, sci, abbr, **kw):
    E[gid] = dict(crop=name, sci=sci, abbr=abbr, **kw)

F, P = 'FULL_SUN', 'PARTIAL_SHADE'
crop('613c9b', 'Tomato', 'Solanum lycopersicum', 'To', germ=(7, 14), transplantAge=(42, 56), depth=(0.5, 1), inrow=(45, 75), rows=100, sun=F, transplantable=True, basis='transplant', lifecycle='annual', season='warm')
crop('45f657', 'Squash', 'Cucurbita spp.', 'Sq', germ=(7, 14), depth=2, inrow=(45, 60), rows=(90, 120), sun=F, transplantable=True, basis='sowing', basisAssumed=True, lifecycle='annual', season='warm',
     overrides={'Acorn Squash Seeds': dict(inrow=(90, 120), rows=(120, 180)), 'Butternut Squash Seeds': dict(inrow=(90, 120), rows=(120, 180)), 'Kabocha Squash Seeds': dict(inrow=(90, 120), rows=(120, 180)), 'Spaghetti Squash Seeds': dict(inrow=(90, 120), rows=(120, 180)), 'Delicata Squash Seeds': dict(inrow=(90, 120), rows=(120, 180)), 'Buttercup Squash Seeds': dict(inrow=(90, 120), rows=(120, 180))})
crop('e06f5c', 'Lettuce', 'Lactuca sativa', 'Le', germ=(7, 15), depth=0.5, inrow=(20, 30), rows=(45, 90), sun=F, transplantable=True, basis='sowing', lifecycle='annual', season='cool',
     overrides={'Looseleaf Lettuce Seeds': dict(inrow=(20, 25)), 'Romaine Lettuce Seeds': dict(inrow=30), 'Butterhead Lettuce Seeds': dict(inrow=30)})
crop('c558e4', 'Pepper', 'Capsicum annuum', 'Pe', germ=(10, 21), depth=(0.5, 1), sun=F, transplantable=True, basis='transplant', lifecycle='annual', season='warm', indoorWeeksBeforeLastFrost=(6, 8))
crop('b4f991', 'Pumpkin', 'Cucurbita pepo', 'Pu', germ=(7, 14), depth=2, inrow=(90, 120), rows=(120, 180), sun=F, transplantable=True, basis='sowing', basisAssumed=True, lifecycle='annual', season='warm')
crop('e257c2', 'Carrot', 'Daucus carota', 'Ca', germ=(14, 21), depth=0.5, sun=F, transplantable=False, basis='sowing', lifecycle='annual', season='cool', successionWeeks=3)
crop('722b84', 'Cucumber', 'Cucumis sativus', 'Cu', transplantAge=(21, 28), depth=2, inrow=23, rows=90, sun=F, transplantable=True, basis='transplant', lifecycle='annual', season='warm')
crop('1c2778', 'Kale', 'Brassica oleracea var. acephala', 'Ka', germ=(7, 10), depth=0.5, inrow=(45, 60), rows=(75, 90), sun=F, transplantable=True, basis='sowing', basisAssumed=True, lifecycle='annual', season='cool', indoorWeeksBeforeLastFrost=(4, 6))
crop('999677', 'Pea', 'Pisum sativum', 'Pa', germ=(7, 14), depth=2, inrow=(2, 7), sun=None, transplantable=False, basis='sowing', lifecycle='annual', season='cool')
crop('3e1976', 'Onion', 'Allium cepa', 'On', germ=(6, 12), depth=(0.5, 1), inrow=15, rows=(45, 75), sun=None, transplantable=True, basis='transplant', lifecycle='annual', season='cool', frost=(14, 28),
     overrides={'Scallion Seeds': dict(inrow=(2, 5), rows=15)})
crop('aa5f00', 'Cabbage', 'Brassica oleracea var. capitata', 'Cb', germ=(7, 10), depth=0.5, inrow=(45, 60), rows=(60, 90), sun=F, transplantable=True, basis='transplant', lifecycle='annual', season='cool')
crop('d45b59', 'Bush Bean', 'Phaseolus vulgaris', 'Bb', germ=(8, 16), depth=(2, 5), inrow=15, rows=(45, 60), sun=F, transplantable=True, basis='sowing', lifecycle='annual', season='warm', successionWeeks=3)
crop('151dd9', 'Corn', 'Zea mays', 'Co', germ=(7, 10), depth=(2, 5), inrow=7.5, rows=(60, 90), sun=F, transplantable=True, basis='sowing', lifecycle='annual', season='warm')
crop('040ae7', 'Beet', 'Beta vulgaris', 'Be', germ=(5, 12), depth=1, inrow=(5, 10), rows=(30, 45), sun=F, transplantable=False, basis='sowing', lifecycle='biennial', season='cool')
crop('9520c3', 'Radish', 'Raphanus sativus', 'Ra', germ=(5, 7), depth=0.5, inrow=(2.5, 5), rows=(30, 45), sun=F, transplantable=False, basis='sowing', lifecycle='annual', season='cool')
crop('680897', 'Mustard Greens', 'Brassica juncea', 'Mg', germ=(5, 10), depth=(0.5, 1), inrow=(10, 15), sun=F, transplantable=False, basis='sowing', lifecycle='annual', season='cool', successionWeeks=3)
crop('4c6bcd', 'Pole Bean', 'Phaseolus vulgaris', 'Pb', germ=(8, 16), depth=3.5, inrow=(7, 10), sun=F, transplantable=True, basis='sowing', basisAssumed=True, lifecycle='annual', season='warm')
crop('9023bf', 'Eggplant', 'Solanum melongena', 'Eg', germ=(7, 12), depth=(0.5, 1), inrow=(45, 60), sun=F, transplantable=True, basis='transplant', lifecycle='annual', season='warm', indoorWeeksBeforeLastFrost=4)
crop('4f8cfb', 'Broccoli', 'Brassica oleracea var. italica', 'Br', germ=(7, 10), depth=0.5, inrow=(45, 60), rows=(75, 90), sun=F, transplantable=True, basis='transplant', lifecycle='annual', season='cool')
crop('a44f9e', 'Cauliflower', 'Brassica oleracea var. botrytis', 'Cf', germ=(7, 10), transplantAge=(35, 42), depth=0.5, inrow=(45, 60), rows=(60, 90), sun=F, transplantable=True, basis='transplant', lifecycle='annual', season='cool')
crop('a3018b', 'Endive', 'Cichorium endivia', 'En', germ=(2, 15), depth=0.5, inrow=(30, 45), rows=(30, 45), sun=F, transplantable=True, basis='sowing', lifecycle='annual', season='cool')
crop('b6d893', 'Mesclun', None, 'Me', sun=F, transplantable=False, basis=None, inrow=1, lifecycle='annual', season='cool', successionWeeks=3)
crop('c15fda', 'Pac Choi', 'Brassica rapa subsp. chinensis', 'Pc', depth=(0.5, 1), inrow=(15, 20), rows=(30, 45), sun=F, transplantable=False, basis=None, lifecycle='annual', season='cool', frost=(-28, 56))
crop('cbbb66', 'Melon', 'Cucumis melo', 'Ml', germ=(5, 10), transplantAge=35, depth=1, inrow=(60, 90), rows=(150, 200), sun=F, transplantable=True, basis='transplant', lifecycle='annual', season='warm')
crop('c02b99', 'Zucchini', 'Cucurbita pepo', 'Zu', germ=(7, 14), depth=2, inrow=(45, 60), rows=(90, 120), sun=F, transplantable=True, basis='sowing', basisAssumed=True, lifecycle='annual', season='warm')
crop('c2facd', 'Spinach', 'Spinacia oleracea', 'Sp', germ=(7, 14), depth=1, inrow=(5, 8), rows=(30, 45), sun=F, transplantable=False, basis='sowing', lifecycle='annual', season='cool', successionWeeks=3, frost=(-28, 21))
crop('d31a65', 'Swiss Chard', 'Beta vulgaris var. cicla', 'Sc', germ=(7, 14), depth=1, inrow=(10, 30), rows=45, sun=F, transplantable=False, basis='sowing', lifecycle='biennial', season='cool')
crop('2a5207', 'Arugula', 'Eruca sativa', 'Ar', sun=None, transplantable=True, basis='transplant', lifecycle='annual', season='cool', indoorWeeksBeforeLastFrost=(2, 4))
crop('0fd077', 'Celery', 'Apium graveolens', 'Ce', germ=(20, 30), depth=0.5, sun=F, transplantable=True, basis='transplant', lifecycle='biennial', season='cool')
crop('6f142f', 'Leek', 'Allium ampeloprasum var. porrum', 'Lk', germ=(10, 16), depth=0.5, inrow=20, rows=45, sun=F, transplantable=True, basis='transplant', basisAssumed=True, lifecycle='biennial', season='cool', indoorWeeksBeforeLastFrost=(6, 8))
crop('b2bfc5', 'Kohlrabi', 'Brassica oleracea var. gongylodes', 'Kh', germ=(7, 10), depth=0.5, inrow=(10, 15), rows=(30, 45), sun=F, transplantable=True, basis='sowing', lifecycle='annual', season='cool', frost=(28, 42), indoorWeeksBeforeLastFrost=4)
crop('b64691', 'Basil', 'Ocimum basilicum', 'Bs', germ=(5, 10), depth=1, inrow=(20, 25), sun=F, transplantable=True, basis=None, lifecycle='annual', season='warm')
crop('20afe9', 'Drying Bean', 'Phaseolus vulgaris', 'Db', germ=(8, 16), depth=(2, 5), inrow=15, rows=(45, 60), sun=F, transplantable=True, basis='sowing', basisAssumed=True, lifecycle='annual', season='warm')
crop('3cb42d', 'Brussels Sprouts', 'Brassica oleracea var. gemmifera', 'Bs', germ=(7, 10), depth=1, inrow=(45, 60), rows=(75, 90), sun=F, transplantable=True, basis='transplant', lifecycle='annual', season='cool')
crop('a8c1e7', 'Lavender', 'Lavandula spp.', 'Lv', germ=(14, 21), depth=0, sun=F, transplantable=True, basis=None, lifecycle='perennial', season='warm')
crop('f33608', 'Dill', 'Anethum graveolens', 'Di', germ=(10, 21), depth=0.5, inrow=15, rows=45, sun=F, transplantable=False, basis=None, lifecycle='annual', season='warm', successionWeeks=(2, 3))
crop('395e47', 'Parsley', 'Petroselinum crispum', 'Pa', depth=(1, 3), inrow=15, sun=F, transplantable=True, basis=None, lifecycle='biennial', season='cool')
crop('b2c849', 'Turnip', 'Brassica rapa var. rapa', 'Tu', germ=(7, 14), depth=(0.5, 1), inrow=(15, 20), rows=60, sun=F, transplantable=False, basis='sowing', basisAssumed=True, lifecycle='biennial', season='cool')
crop('e7312a', 'Cilantro', 'Coriandrum sativum', 'Cl', germ=(5, 10), depth=2, inrow=(5, 10), sun=F, transplantable=False, basis=None, lifecycle='annual', season='cool')
crop('2ee969', 'Parsnip', 'Pastinaca sativa', 'Ps', depth=(0.5, 1), inrow=(7, 10), rows=(45, 60), sun=None, transplantable=False, basis='sowing', lifecycle='biennial', season='cool')
crop('36a886', 'Asparagus', 'Asparagus officinalis', 'As', germ=(14, 56), depth=1, sun=F, transplantable=True, basis=None, lifecycle='perennial', season='cool')
crop('3772a4', 'Chives', 'Allium schoenoprasum', 'Ch', depth=(0.5, 1), inrow=15, sun=F, transplantable=True, basis=None, lifecycle='perennial', season='cool')
crop('419531', 'Corn Salad', 'Valerianella locusta', 'Cs', germ=(7, 21), depth=1, inrow=5, rows=30, sun=F, transplantable=False, basis=None, lifecycle='annual', season='cool')
crop('4eed25', 'Artichoke', 'Cynara cardunculus var. scolymus', 'Ak', germ=(10, 21), depth=0.5, inrow=100, sun=F, transplantable=True, basis='transplant', lifecycle='perennial', season='cool', indoorWeeksBeforeLastFrost=(4, 6))
crop('65b442', 'Fennel', 'Foeniculum vulgare var. dulce', 'Fe', germ=(10, 14), depth=1, inrow=(20, 30), rows=45, sun=F, transplantable=True, basis='sowing', lifecycle='annual', season='warm', indoorWeeksBeforeLastFrost=4)
crop('7d9040', 'Oregano', 'Origanum vulgare', 'Oe', germ=(7, 14), depth=0, sun=F, transplantable=True, basis=None, lifecycle='perennial', season='warm')
crop('a378da', 'Mint', 'Mentha spp.', 'Mi', germ=(10, 16), depth=0.5, inrow=(45, 60), sun=F, transplantable=True, basis=None, lifecycle='perennial', season='cool', indoorWeeksBeforeLastFrost=(8, 10))
crop('f523bd', 'Shiso', 'Perilla frutescens var. crispa', 'Sh', germ=(7, 14), sun=F, transplantable=True, basis=None, lifecycle='annual', season='warm')
crop('465a70', 'Savory', 'Satureja hortensis', 'Sv', germ=(10, 15), depth=0, sun=F, transplantable=True, basis=None, lifecycle='annual', season=None, indoorWeeksBeforeLastFrost=(4, 6))
crop('4748f1', 'Broad Bean', 'Vicia faba', 'Bd', germ=(10, 14), depth=5, inrow=15, rows=23, sun=F, transplantable=False, basis=None, lifecycle='annual', season='cool')
crop('569eba', 'Rutabaga', 'Brassica napobrassica', 'Rt', germ=(7, 15), depth=(0.5, 1), inrow=(15, 20), rows=(60, 75), sun=F, transplantable=False, basis='sowing', lifecycle='biennial', season='cool')
crop('58db92', 'Tomatillo', 'Physalis philadelphica', 'Tm', depth=(0.5, 1), inrow=(45, 60), rows=(90, 120), sun=F, transplantable=True, basis='transplant', basisAssumed=True, lifecycle='annual', season='warm')
crop('6411b6', 'Runner Bean', 'Phaseolus coccineus', 'Rb', germ=(8, 16), depth=3.5, inrow=(7, 10), sun=F, transplantable=True, basis='sowing', basisAssumed=True, lifecycle='annual', season='warm')
crop('8f54e1', 'Amaranth', 'Amaranthus spp.', 'Am', germ=(4, 10), depth=0.5, inrow=(25, 35), rows=50, sun=F, transplantable=False, basis='sowing', lifecycle='annual', season='warm')
crop('b194dc', 'Lemon Balm', 'Melissa officinalis', 'Lb', germ=(10, 14), depth=0, inrow=45, sun=F, transplantable=True, basis=None, lifecycle='perennial', season='cool', indoorWeeksBeforeLastFrost=(6, 8))
crop('c51905', 'Soya Bean', 'Glycine max', 'Sy', germ=(8, 16), depth=(2, 5), inrow=(5, 10), rows=60, sun=F, transplantable=True, basis=None, lifecycle='annual', season='warm')
crop('d70a4b', 'Sesame', 'Sesamum indicum', 'Ss', sun=F, transplantable=True, basis='transplant', lifecycle='annual', season='hot', indoorWeeksBeforeLastFrost=(4, 6))
crop('e5e288', 'Thyme', 'Thymus vulgaris', 'Th', depth=0, inrow=(23, 38), sun=F, transplantable=True, basis=None, lifecycle='perennial', season=None)
crop('f06b2d', 'Bergamot', 'Monarda citriodora', 'Bg', germ=(10, 40), depth=0, inrow=(45, 60), sun=F, transplantable=True, basis=None, lifecycle='perennial', season='warm', indoorWeeksBeforeLastFrost=(6, 8))
crop('085d91', 'Lemongrass', 'Cymbopogon flexuosus', 'Lg', germ=(5, 21), depth=0.5, sun=F, transplantable=True, basis=None, lifecycle='perennial', season='hot')
crop('1691c9', 'Liquorice', 'Glycyrrhiza glabra', 'Lq', germ=(7, 14), depth=0.5, inrow=100, sun=F, transplantable=True, basis=None, lifecycle='perennial', season='warm')
crop('1d7b8b', 'Okra', 'Abelmoschus esculentus', 'Ok', depth=1, inrow=(30, 45), rows=(60, 90), sun=F, transplantable=True, basis=None, lifecycle='annual', season='warm')
crop('2937ab', 'Sweet Alyssum', 'Lobularia maritima', 'Sa', germ=(5, 14), depth=0, sun=None, transplantable=False, basis=None, lifecycle='annual', season=None)
crop('295c67', 'Rhubarb', 'Rheum rhabarbarum', 'Rh', germ=(5, 10), depth=2, inrow=120, rows=(100, 120), sun=F, transplantable=True, basis=None, lifecycle='perennial', season='cool')
crop('29a779', 'Broccoli Raab', 'Brassica rapa var. ruvo', 'Bq', germ=(7, 10), depth=0.5, inrow=(45, 60), rows=(75, 90), sun=F, transplantable=True, basis='transplant', lifecycle='annual', season='cool')
crop('2e87c4', 'Stinging Nettle', 'Urtica dioica', 'Ne', germ=14, depth=0.5, inrow=(20, 30), sun=F, transplantable=True, basis=None, lifecycle='perennial', season=None)
crop('430c94', 'Perennial Ryegrass', 'Lolium perenne', 'Pr', depth=(2, 4), sun=None, transplantable=False, basis=None, lifecycle='perennial', season=None)
crop('488b02', 'New Zealand Spinach', 'Tetragonia tetragonioides', 'Nz', depth=1, inrow=(30, 45), rows=(60, 90), sun=F, transplantable=True, basis='sowing', lifecycle='annual', season='warm', indoorWeeksBeforeLastFrost=(2, 3))
crop('4d9d1e', 'Potato', 'Solanum tuberosum', 'Po', germ=(10, 14), transplantAge=42, depth=0.6, sun=F, transplantable=True, basis=None, lifecycle='annual', season='cool', indoorWeeksBeforeLastFrost=6)
crop('4f309d', 'Chamomile', 'Matricaria recutita', 'Cm', germ=(10, 14), depth=1, inrow=(10, 15), sun=F, transplantable=True, basis=None, lifecycle='annual', season='warm')
crop('57f4ee', 'Catnip', 'Nepeta cataria', 'Cn', germ=(10, 20), depth=0, inrow=30, sun=F, transplantable=True, basis=None, lifecycle='perennial', season='warm')
crop('653bb1', 'Borage', 'Borago officinalis', 'Bo', germ=(5, 15), depth=1, inrow=60, sun=F, transplantable=False, basis=None, lifecycle='annual', season='cool')
crop('6bcc7d', 'Cumin', 'Cuminum cyminum', 'Cx', germ=(7, 14), depth=0.5, inrow=10, sun=F, transplantable=True, basis=None, lifecycle='annual', season='warm', indoorWeeksBeforeLastFrost=4)
crop('774c70', 'Mexican Tarragon', 'Tagetes lucida', 'Mt', germ=(4, 14), sun=F, transplantable=True, basis=None, inrow=(30, 45), lifecycle='perennial', season='warm', indoorWeeksBeforeLastFrost=(6, 8))
crop('7a0cb7', 'Lovage', 'Levisticum officinale', 'Lo', germ=(10, 14), depth=0.5, inrow=60, sun=F, transplantable=True, basis=None, lifecycle='perennial', season='warm')
crop('80015f', 'Strawberry', 'Fragaria vesca', 'St', germ=(7, 42), depth=0, sun=F, transplantable=True, basis=None, lifecycle='perennial', season=None)
crop('8cec1b', 'Fenugreek', 'Trigonella foenum-graecum', 'Fg', germ=(7, 10), depth=0.5, inrow=10, sun=F, transplantable=True, basis=None, lifecycle='annual', season='warm')
crop('af58d2', 'Marjoram', 'Origanum majorana', 'Mj', germ=(7, 14), depth=0, sun=F, transplantable=True, basis=None, lifecycle='perennial', season=None)
crop('b94f6c', 'Gai Lan', 'Brassica oleracea var. alboglabra', 'Gl', germ=(7, 10), depth=0.5, inrow=(15, 30), sun=F, transplantable=False, basis='sowing', lifecycle='annual', season='cool')
crop('b9b416', 'Sage', 'Salvia officinalis', 'Sg', germ=(14, 21), depth=0.3, inrow=(45, 60), sun=F, transplantable=True, basis=None, lifecycle='perennial', season='warm')
crop('d50249', 'Rosemary', 'Salvia rosmarinus', 'Rm', depth=0, sun=F, transplantable=True, basis=None, lifecycle='perennial', season=None)
crop('db16c0', 'Alsike Clover', 'Trifolium hybridum', 'Ac', depth=0.5, sun=None, transplantable=False, basis=None, lifecycle='perennial', season=None)
crop('df4b76', 'Stevia', 'Stevia rebaudiana', 'Sv', germ=(10, 16), depth=0, sun=F, transplantable=True, basis=None, lifecycle='perennial', season='warm', indoorWeeksBeforeLastFrost=(8, 10))
crop('e822a2', 'Caraway', 'Carum carvi', 'Cw', depth=(0.5, 1), inrow=20, sun=F, transplantable=False, basis=None, lifecycle='biennial', season='cool')
crop('ea959d', 'Chervil', 'Anthriscus cerefolium', 'Cv', depth=(0.5, 1), inrow=(23, 30), sun=F, transplantable=False, basis=None, lifecycle='annual', season='cool')

# Groups deliberately left out: sprouting seeds and microgreens are not planted in a garden.
SKIP = {'be0fb6', '5f7bf3'}

COMPANIONS = {
 'Turnips are easy going': (['mint', 'peas'], []),
 'Another sensitive plant when it comes to companions, tomatoes': (['asparagus', 'basil', 'beans', 'borage', 'carrots', 'celery', 'chives', 'collards', 'cucumber', 'garlic', 'lettuce', 'marigold', 'mint', 'nasturtium', 'onion', 'parsley', 'peppers'], ['brassicas', 'dill', 'corn', 'kohlrabi', 'potatoes', 'walnut trees']),
 'Beans, Brassicas, and onions make the best companions for chard': (['beans', 'brassicas', 'onions'], []),
 'Companions: corn, lettuce, melons': (['corn', 'lettuce', 'melons', 'peas', 'radish', 'borage', 'marigolds', 'nasturtium'], ['brassicas', 'potatoes']),
 'Plant radishes near': (['beans', 'beets', 'celeriac', 'chervil', 'cucumber', 'lettuce', 'mint', 'parsnip', 'peas', 'spinach', 'squash', 'tomatoes'], ['agastache', 'potatoes']),
 'A worthy companion for beets': (['beets', 'brassicas', 'cucumbers', 'onions'], ['peppers', 'pole beans', 'strawberries', 'tomatoes']),
 'Pepper plants make good neighbours': (['asparagus', 'basil', 'carrots', 'cucumbers', 'eggplant', 'endive', 'oregano', 'parsley', 'rosemary', 'squash', 'swiss chard', 'tomatoes'], ['beans', 'brassicas', 'fennel']),
 'Parsley likes': (['asparagus', 'carrots', 'chives', 'corn', 'onions', 'tomatoes', 'roses'], ['mint']),
 'The pungent odour of onions': (['chamomile', 'summer savory', 'beets', 'brassicas', 'carrots', 'dill', 'kohlrabi', 'leeks', 'lettuce', 'strawberries', 'tomatoes'], ['asparagus', 'peas']),
 'Plant with corn to shade the soil': (['corn'], []),
 'Melons are great companions': (['corn', 'marigolds', 'nasturtiums', 'pumpkin', 'radish', 'squash', 'sunflowers'], ['potatoes']),
 'Lettuce plants make good companions': (['beets', 'brassicas', 'carrot', 'celery', 'chervil', 'cucumbers', 'dill', 'garlic', 'onions', 'radish', 'spinach', 'squash', 'strawberries'], []),
 'Grow leeks with': (['beets', 'carrot', 'celery', 'onions', 'spinach'], ['beans', 'peas']),
 'All Brassicas benefit from chamomile': (['chamomile', 'dill', 'mint', 'rosemary', 'sage'], ['eggplants', 'peppers', 'potatoes', 'tomatoes']),
 'Basil is said to improve': (['tomatoes', 'asparagus', 'oregano', 'peppers'], []),
 'As a legume, fenugreek': (['corn', 'cucumbers', 'brassicas'], []),
 'An all around beneficial plant': (['brassicas', 'strawberries'], []),
 'Mint attracts earthworms': (['brassicas'], ['parsley']),
 'Oregano is particularly good': (['brassicas', 'asparagus', 'basil'], []),
 'As a legume, liquorice': (['lettuce', 'spinach'], []),
 'These little plants respond strongly': (['beans', 'borage', 'garlic', 'lettuce', 'onions', 'peas', 'spinach', 'thyme'], ['brassicas', 'fennel']),
 'Eggplants are a good companion': (['amaranth', 'beans', 'marigolds', 'peas', 'peppers', 'spinach', 'thyme'], ['fennel']),
 'Plant cucumbers beside': (['asparagus', 'beans', 'brassicas', 'celery', 'corn', 'dill', 'kohlrabi', 'lettuce', 'onion', 'peas', 'radish', 'tomatoes', 'sunflowers', 'nasturtiums'], ['potatoes', 'sage']),
 'Plant with bean seeds, Brassicas': (['beans', 'brassicas', 'chives', 'leeks', 'lettuce', 'onions', 'peas', 'peppers', 'pole beans', 'radish', 'rosemary', 'sage', 'tomatoes'], ['dill', 'parsnips', 'potatoes']),
 'Celery is a good partner': (['beans', 'brassicas', 'cucumber', 'garlic', 'leek', 'lettuce', 'onion', 'tomatoes'], []),
 'Beets add minerals': (['bush beans', 'brassicas', 'corn', 'garlic', 'kohlrabi', 'leeks', 'lettuce', 'mint'], ['pole beans']),
 'Companion planting is a cornerstone': (['asters', 'basil', 'cilantro', 'dill', 'marigolds', 'nasturtiums', 'oregano', 'parsley', 'peppers', 'sage', 'thyme', 'tomatoes'], []),
 'Beans fix nitrogen in the soil': (['beets', 'brassicas', 'carrots', 'celery', 'chard', 'corn', 'cucumber', 'eggplant', 'peas', 'potatoes', 'radish', 'strawberries'], ['chives', 'garlic', 'leeks', 'onions']),
 'Corn is a good companion': (['beans', 'beets', 'cucumber', 'dill', 'melons', 'parsley', 'peas', 'potato', 'soya beans', 'squash', 'sunflower'], ['celery', 'tomatoes']),
 'Superb companions for beans': (['beans', 'carrots', 'celery', 'corn', 'cucumber', 'eggplant', 'parsley', 'peppers', 'potatoes', 'radish', 'spinach', 'strawberries', 'turnips'], ['onions']),
 'Excellent for fixing nitrogen': ([], ['onions']),
 'Good for fixing nitrogen': (['corn'], []),
 'Dill improves the health': (['brassicas', 'corn', 'cucumbers', 'lettuce', 'onions'], ['carrots', 'tomatoes']),
 'Chives are said to improve': (['carrots', 'tomatoes', 'brassicas'], ['beans', 'peas']),
 'This herb attracts honeybees': (['beans', 'onions'], []),
 'Chamomile attracts hoverflies': (['onions'], []),
 'Borage is an excellent all around': (['tomatoes', 'strawberries'], []),
 'Marjoram is particularly good': (['brassicas', 'asparagus', 'basil'], []),
 'Sage repels both': (['brassicas', 'carrots'], ['cucumbers']),
 'Rosemary is a good companion': (['beans', 'brassicas', 'carrots'], []),
 'Chervil is an excellent companion': (['brassicas', 'lettuce', 'radishes'], []),
}
